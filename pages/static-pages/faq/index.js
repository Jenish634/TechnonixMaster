import React, { Component, useEffect, useState, useRef } from 'react';
import { Text,View,ScrollView } from 'react-native';


const FAQ =(props)=>{


    const render =()=>{
        return <View style={{ flex: 1, backgroundColor: 'white' }}>

        <ScrollView style={{ marginTop: 10, }}>
        <View style={{ flexDirection:'row' ,justifyContent:'center'}}>
        </View>
          {/* Account design */}
          <View style={{ marginLeft: 20, marginTop: 15, marginRight: 20 }}>
            <Text style={{ color: "#0a356d", height: 22, fontSize: 14, fontWeight: '600' }}> Why FAQ Pages Are a Priority</Text>

            <Text>FAQ pages continue to be a priority area for SEO and digital marketing professionals.

An FAQ page is one of the simplest ways to improve your site and help site visitors and users.</Text>
<Text>In no small part, the importance of FAQ pages has been driven in recent years by the growth in voice search, mobile search, and personal/home assistants and speakers.</Text>
          </View>

 {/* Account design */}
 <View style={{ marginLeft: 20, marginTop: 15, marginRight: 20 }}>
            <Text style={{ color: "#0a356d", height: 22, fontSize: 14, fontWeight: '600' }}>Environment Details</Text>

            <Text>The extended bug report basically consists of three fields: steps to reproduce, actual results, and expected results. This is where your QA team, beta testers, or users can dive more into the details about what happened that led to the bug and explain what the expected results were and what the outcome eventually was.</Text>
            <Text>In terms of the repro steps, users should describe the step by step flow that led them to face the reported bug. This should be an actual list of anything and everything they clicked on, navigated to, or any other action they performed in the mobile app that could have caused the problem. This helps the developers to be able to retrace the steps to reproduce the bug, see where the actual problem was along the way, and fix it accordingly.</Text>
          </View>
          <View style={{ marginLeft: 20, marginTop: 15, marginRight: 20 }}>
            <Text style={{ color: "#0a356d", height: 22, fontSize: 14, fontWeight: '600' }}>Environment Details</Text>

            <Text>Certain issues might occur due to external circumstances like the device, OS, OS version, locale, memory usage, battery percentage, network, and more. So it’s useful to provide all of the details you can to the developer to help them get to the issue faster and more efficiently.

This is another reason why using a bug reporting tool is perfect as it automatically captures user steps, network logs, and all device details to help you know exactly why a bug happened so you can spend your time fixing rather than debugging.</Text>
            <Text>In terms of the repro steps, users should describe the step by step flow that led them to face the reported bug. This should be an actual list of anything and everything they clicked on, navigated to, or any other action they performed in the mobile app that could have caused the problem. This helps the developers to be able to retrace the steps to reproduce the bug, see where the actual problem was along the way, and fix it accordingly.</Text>
          </View>
        </ScrollView>
      </View>
    }
    return render()
}

export default FAQ