import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { uploadProject } from '../reducers/project-state';
import { projectTitleInitialState } from '../reducers/project-title';

class CloudSaver extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, ['saveProject']);
    }

    saveProject() {
        this.props.saveProjectSb3().then(content => {
            if (this.props.onSaveFinished) {
                this.props.onSaveFinished();
            }
            // 保存文件到云端            
            this.props.uploadProjectToCloud(new File([content], this.props.projectFilename));
        });
    }

    render() {
        const { children } = this.props;
        // 这种方式是将自己的className和downloadProject方法传递给children        
        // 即里面的MenuItem组件。MenuItem组件初始化需要className和onClick方法        
        return children(this.props.className, this.saveProject);
    }
}

const getProjectFilename = (curTitle, defaultTitle) => {
    let filenameTitle = curTitle;
    if (!filenameTitle || filenameTitle.length === 0) {
        filenameTitle = defaultTitle;
    }
    return `${filenameTitle.substring(0, 100)}.sb3`;
};

CloudSaver.propTypes = {
    children: PropTypes.func,
    className: PropTypes.string,
    onSaveFinished: PropTypes.func,
    saveProjectSb3: PropTypes.func,
    projectFilename: PropTypes.string,
    uploadProjectToCloud: PropTypes.func
};

CloudSaver.defaultProps = { className: '' };

const mapStateToProps = state => ({
    saveProjectSb3: state.scratchGui.vm.saveProjectSb3.bind(state.scratchGui.vm),
    projectFilename: getProjectFilename(state.scratchGui.projectTitle, projectTitleInitialState)
});

const mapDispatchToProps = dispatch => ({
    uploadProjectToCloud: fileData => uploadProject(dispatch, fileData)
});

export default connect(mapStateToProps, mapDispatchToProps)(CloudSaver);