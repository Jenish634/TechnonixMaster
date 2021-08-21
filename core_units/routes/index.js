import React, { useEffect, useState } from "react";
import { Router, Stack, Scene, Actions } from "react-native-router-flux";
import _ from "lodash";
import routeConfigs from "./config";
import HandlingEvents from "./handling-events";
import style from "./style";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  CheckBox,
  Modal,
} from "react-native";
const Routes = () => {
  // Declare a new state variable, which we'll call "appRouteConfigs"
  const [appRouteConfigs, setAppRouteConfigs] = useState(routeConfigs);
  // Declare a new state variable, which we'll call "appRouteConfigsCount"
  const [appRouteConfigsCount, setAppRouteConfigsCount] = useState(0);

  // Defining component didMount
  useEffect(() => {
    interceptRouteConfigs();
  }, []);
  // handler for appRouteConfigs
  useEffect(() => {
    setAppRouteConfigsCount(_.add(appRouteConfigsCount, 1));
  }, [appRouteConfigs]);

  const interceptRouteConfigs = async () => {
    let modifyRouteConfig = _.clone(appRouteConfigs);
    await new Promise((resolve) => {
      _.forEach(modifyRouteConfig, (routeConfig, key) => {
        if (
          _.chain(routeConfig).get("dashboardWrapper", false).eq(true).value()
        ) {
          routeConfig.renderLeftButton = () =>
            _.get(routeConfig, "hideLeftHeader", false) == false &&
            (_.get(routeConfig, "headerType") == true ? (
              <global.components.dashboardWrapper.Header.Back />
            ) : (
              <global.components.dashboardWrapper.Header.Left />
            ));
          routeConfig.renderRightButton = () =>
            _.get(routeConfig, "notification") == true ? (
              <global.components.dashboardWrapper.Header.RightNotification />
            ) : (
              _.get(routeConfig, "hideRightHeader", false) == false && (
                <global.components.dashboardWrapper.Header.Right />
              )
            );
          const Component = _.chain(routeConfig)
            .clone()
            .get("component")
            .value();
          routeConfig.component = (props) => {
            return _.get(routeConfig, "hideFooter", false) == false ? (
              <React.Fragment>
                <Component {...props} />
                <global.components.dashboardWrapper.Footer />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Component {...props} />
              </React.Fragment>
            );
          };
          if (_.chain(modifyRouteConfig).size().subtract(1).eq(key).value()) {
            resolve();
          }
        }
      });
    });
    setAppRouteConfigs(modifyRouteConfig);
  };

  const initializeHandlingEvents = () => {
    if (_.eq(appRouteConfigsCount, 1)) {
      return <HandlingEvents />;
    }
  };
  const titleRender = () => {
    return (
      <TouchableOpacity
        onPress={() =>
          global.utils.routes.navigateToAction({
            key: "Dashboard",
            push_on_duplicate_key: false,
          })
        }
        style={{ marginTop: -12, marginLeft: -23 }}
      >
        <Image
          style={{ width: 150, height: 70, marginLeft: -23 }}
          source={require("../../assets/3.png")}
        />
      </TouchableOpacity>
    );
  };
  const render = () => {
    return (
      <React.Fragment>
        {initializeHandlingEvents()}
        <Router navigationBarStyle={style.routerNavigationBarStyle}>
          <Stack key="root">
            {_.map(appRouteConfigs, (appRouteConfig) => {
              const props = {
                ...appRouteConfig,
              };
              return <Scene hideTabBar={true} hideNavBar={true} {...props} />;
            })}
          </Stack>
        </Router>
      </React.Fragment>
    );
  };

  return render();
};
export default Routes;
