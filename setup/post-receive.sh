#!/usr/bin/env bash
echo "##### post-receive hook #####"
read oldrev newrev refname
echo "Push triggered update to revision $newrev ($refname)"

RUN_FOR_REF="refs/heads/master"
if [[ "$refname" ==  "$RUN_FOR_REF" ]]; then
    GIT="env -i git"
    CMD_CD="cd $(readlink -nf "$PWD/..")"
    CMD_FETCH="$GIT fetch"
    CMD_YARN="sudo -u www-data yarn"
    CMD_BUILD="sudo -u www-data nice yarn build"
    CMD_RESTART="pm2 restart pm2.json"

    echo "$ $CMD_CD"
    eval ${CMD_CD}
    echo "$ $CMD_FETCH"
    eval ${CMD_FETCH}

    if $GIT diff --name-only $oldrev $newrev | grep "^yarn.lock"; then
        echo "$ $CMD_YARN"
        eval $CMD_YARN
    else
        echo "# Skipping yarn install, lockfile not modified"
    fi

    if $GIT diff --name-only $oldrev $newrev | grep "^\(src\|public\)/"; then
        echo "$ $CMD_BUILD"
        eval $CMD_BUILD
    else
        echo "# Skipping build, no changes in src or public folders"
    fi

    echo "$ $CMD_RESTART"
    eval $CMD_RESTART
else
    echo "Ref does not match $RUN_FOR_REF, exiting."
fi

echo "##### end post-receive hook #####"
