import { RefObject, useCallback, useEffect, useMemo, useState } from 'react';
import ClipboardJS from 'clipboard';
import { Tooltip } from 'reactstrap';

interface CopyToClipboardHook {
  enabled?: boolean;
  containerRef?: RefObject<HTMLElement>;
  targetRef: RefObject<HTMLElement>;
  copyButtonRef: RefObject<HTMLElement>;
}

interface CopyToClipboardHookResult {
  tooltip: JSX.Element | null;
  copyStatus: boolean;
  clearCopyStatus: VoidFunction;
}

export const useCopyToClipboard = ({
  enabled = true,
  copyButtonRef,
  targetRef,
  containerRef,
}: CopyToClipboardHook): CopyToClipboardHookResult => {
  const [copyStatus, setCopyStatus] = useState(false);
  const clearCopyStatus = useCallback(() => setCopyStatus(false), []);

  useEffect(() => {
    if (!enabled) return;

    const copyButton = copyButtonRef.current;
    const urlInput = targetRef.current;
    const modal = containerRef && containerRef.current;
    if (!copyButton || !urlInput) return;

    const clipboard = new ClipboardJS(copyButton, {
      container: modal || undefined,
      target: () => urlInput,
    });

    clipboard.on('success', (e) => {
      setCopyStatus(true);
      e.clearSelection();
    });

    return () => clipboard.destroy();
  }, [containerRef, copyButtonRef, enabled, targetRef]);

  const TooltipComponent = useMemo(
    () =>
      enabled ? (
        <Tooltip target={copyButtonRef} isOpen={copyStatus} fade={false}>
          Copied to clipboard!
        </Tooltip>
      ) : null,
    [copyButtonRef, copyStatus, enabled]
  );

  return {
    tooltip: TooltipComponent,
    copyStatus,
    clearCopyStatus,
  };
};
