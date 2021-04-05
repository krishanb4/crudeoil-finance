import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { MaterialDropZone } from 'dan-components';

class UploadInputImg extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      files: this.props.files
    };
  }

  getFiles =()=> {    
   return this.dropZoneRef.getFiles();
  }

  render() {
    const { files } = this.state;
    
    return (
      <Fragment>
        <div>
          <MaterialDropZone
            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
            files={files}
            showPreviews
            maxSize={5000000}
            filesLimit={1}
            text="Drag and drop image here or click"
            ref = {(com) => { this.dropZoneRef = com; }}
          />
        </div>
      </Fragment>
    );
  }
}

UploadInputImg.propTypes = {
  files :PropTypes.object,
  onCorrectFileSubmitted : PropTypes.func
}

UploadInputImg.defaultProps = {
  files :[]
}

export default UploadInputImg;
