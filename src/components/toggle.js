import './toggle.css'
import * as React from 'react'

class Toggle extends React.Component {
    render() {
      const {
        on,
        className = '',
        'aria-label': ariaLabel,
        onClick,
        onChange,
        ...props
      } = this.props
      const btnClassName = [
        className,
        'toggle-btn',
        on ? 'toggle-btn-on' : 'toggle-btn-off',
      ]
        .filter(Boolean)
        .join(' ')
      return (
        <label aria-label={ariaLabel || 'Toggle'} style={{display: 'block'}}>
          <input
            className="toggle-input"
            type="checkbox"
            checked={on}
            onChange={onChange}
            onClick={onClick}
            data-testid="toggle-input"
          />
          <span className={btnClassName} {...props} />
        </label>
      )
    }
  }
  
  export {Toggle}