import Collapsible from 'react-collapsible';

import './Dropdown.scss';

const Dropdown = ({ options, OptionComponent, trigger, disabledOption, dropdownOpen, setDropdownOpen }) => (
  <Collapsible
    open={dropdownOpen === disabledOption}
    trigger={<div className="custom-dropdown__trigger">{trigger}</div>}
    className="custom-dropdown"
    onTriggerOpening={() => setDropdownOpen(disabledOption)}
  >
    <div className="custom-dropdown__options-container">
      <div className="custom-dropdown__disabled-option">{disabledOption}</div>
      {options.map((option, index) => (
        <OptionComponent
          key={`${index}-${option.name}`}
          option={option}
        />
      ))}
    </div>
  </Collapsible>
);

export default Dropdown;
