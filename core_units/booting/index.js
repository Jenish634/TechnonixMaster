import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import loadFonts from './load-fonts';
import NetworkHandler from './network-handler';


function Booting(props) {

    useEffect(()=>{
      async function bootingAppAssets(){
        await loadFonts();
        props.setAppReadyStatus({
            value: true
        });
      };
      
      bootingAppAssets();
    }, []);

    return (
      <React.Fragment>
        <NetworkHandler/>
      </React.Fragment>
    );
}
const mapStateToProps = state => ({ settings: _.get(state, `app.${global.redux.actionTypes.settings.name}`, {}) });

const mapDispatchToProps = dispatch => ({
    setAppReadyStatus: details =>
        dispatch(global.redux.action.settings.setAppReadyStatus(details))
});
export default connect(mapStateToProps, mapDispatchToProps)(Booting);