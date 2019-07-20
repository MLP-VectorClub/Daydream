#!/usr/bin/env bash
echo "##### post-receive hook #####"
read oldrev newrev refname
echo "Push triggered update to revision $newrev ($refname)"

RUN_FOR_REF="refs/heads/master"
if [[ "$refname" ==  "$RUN_FOR_REF" ]]; then
    GIT="env -i git"
    CMD_CD="cd $(readlink -nf "$PWD/..")"
    CMD_FETCH="$GIT fetch"
    CMD_NPM="sudo -u www-data npm install --no-save"
    CMD_BUILD="sudo -u www-data npm run build"

    echo "$ $CMD_CD"
    eval ${CMD_CD}
    echo "$ $CMD_FETCH"
    eval ${CMD_FETCH}

    if $GIT diff --name-only $oldrev $newrev | grep "^package-lock.json"; then
        echo "$ $CMD_NPM"
        eval $CMD_NPM
    else
        echo "# Skipping npm install, lockfile not modified"
    fi

    if $GIT diff --name-only $oldrev $newrev | grep "^src/"; then
        echo "$ $CMD_BUILD"
        eval $CMD_BUILD
    else
        echo "# Skipping build, no changes in src folder"
    fi
else
    echo "Ref does not match $RUN_FOR_REF, exiting."
fi

echo "##### end post-receive hook #####"
