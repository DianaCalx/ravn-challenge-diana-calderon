import Collapsible from 'react-collapsible';

import './Dropdown.scss';

const Dropdown = ({ options, OptionComponent, trigger, disabledOption }) => (
  <Collapsible open={false} trigger={<div className="custom-dropdown__trigger">{trigger}</div>} className="custom-dropdown">
    <div className="custom-dropdown__options-container">
      <div className="custom-dropdown__disabled-option">{disabledOption}</div>
      {options.map((option, index) => (
        <OptionComponent key={`${index}-${option.name}`} option={option} />
      ))}
    </div>
  </Collapsible>
);

export default Dropdown;
