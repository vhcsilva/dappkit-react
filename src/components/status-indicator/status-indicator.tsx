import {StatusIndicatorProps} from "../../types/status-indicator";


export default function StatusIndicator({isActivating, isActive, error}: StatusIndicatorProps) {
  return (
    <div>
      {error ? (
        <>
          🔴 {error.name ?? 'Error'}
          {error.message ? `: ${error.message}` : null}
        </>
      ) : isActivating ? (
        <>🟡 Connecting</>
      ) : isActive ? (
        <>🟢 Connected</>
      ) : (
        <>⚪️ Disconnected</>
      )}
    </div>
  )
}
