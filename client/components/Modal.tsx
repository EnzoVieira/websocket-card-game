import ReactModal, { Props as ReactModalProps } from "react-modal"

interface IProps extends ReactModalProps {
  data: any[]
  renderKey?: string

  onSelect: (d: any) => void
}

export function Modal({ data, renderKey, onSelect, ...rest }: IProps) {
  return (
    <ReactModal
      ariaHideApp={false} // Remove error
      className="bg-gray-900 m-16 px-16 py-12"
      overlayClassName="fixed inset-0 bg-neutral-700/[.8]"
      {...rest}
    >
      <div className="bg-gray-900">
        <h3 className="">Modal</h3>

        <ul>
          {data.map((d, i) => (
            <li key={i}>
              <button onClick={() => onSelect(d)}>
                {renderKey ? d[renderKey] : d}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </ReactModal>
  )
}
