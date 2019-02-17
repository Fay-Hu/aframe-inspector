var React = require('react');
var Events = require('../../lib/Events.js');
var classNames = require('classnames');
import Select from 'react-select';

const options = [
  { value: 'perspective', event: 'cameraperspectivetoggle', payload: null, label: '透视图' },
  { value: 'ortholeft', event: 'cameraorthographictoggle', payload: 'left', label: '左视图' },
  { value: 'orthoright', event: 'cameraorthographictoggle', payload: 'right', label: '右视图' },
  { value: 'orthotop', event: 'cameraorthographictoggle', payload: 'top', label: '顶视图' },
  { value: 'orthobottom', event: 'cameraorthographictoggle', payload: 'bottom', label: '底视图' },
  { value: 'orthoback', event: 'cameraorthographictoggle', payload: 'back', label: '后视图' },
  { value: 'orthofront', event: 'cameraorthographictoggle', payload: 'front', label: '前视图' }
];

function getOption (value) {
  return options.filter(opt => opt.value === value)[0];
}

export default class CameraToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCamera: 'perspective'
    };
    this.justChangedCamera = false;
  }

  componentDidMount() {
    Events.on('cameratoggle', data => {
      if (this.justChangedCamera) {
        // Prevent recursion.
        this.justChangedCamera = false;
        return;
      }
      this.setState({selectedCamera: data.value});
    });
  }

  onChange(option) {
    console.log(option);
    this.justChangedCamera = true;
    this.setState({selectedCamera: option.value});
    Events.emit(option.event, option.payload);
  }

  render() {
    return (
      <div id="cameraToolbar">
        <Select
          id="cameraSelect"
          classNamePrefix="select"
          options={options}
          simpleValue
          value={getOption(this.state.selectedCamera)}
          isSearchable={false}
          onChange={this.onChange.bind(this)} />
      </div>
    );
  }
}
