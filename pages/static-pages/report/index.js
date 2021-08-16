import React, { Component, useEffect, useState, useRef } from 'react';
import { Text,View,ScrollView } from 'react-native';

const Report =(props)=>{


    const render =()=>{
        return <View style={{ flex: 1, backgroundColor: 'white' }}>

        <ScrollView style={{ marginTop: 10, }}>
          {/* Account design */}
          <View style={{ marginLeft: 20, marginTop: 15, marginRight: 20 }}>
            <Text style={{ color: "#0a356d", height: 22, fontSize: 14, fontWeight: '600' }}>Definition of Report Text</Text>

            <Text>The purpose of the two texts are to give the live-description of the object/participant. Both the report and descriptive text try to show rather than tell the reader about the factual condition of the object. Readers by themselves will catch the impressive point of the object through that showing writing style.</Text>
            <Text>What make different, between report and descriptive text, is the scope of the written object. If we talk about, eg: bicycle, it belongs to report text. It will talk about bicycle in general; its parts, physical strengh, function for certain people or other general characters of bike. In the other hand, descriptive text will convey more focus, for example "my bicycle" with its specific characters; colour, lengh, wheel style, etc</Text>
          </View>

 {/* Account design */}
 <View style={{ marginLeft: 20, marginTop: 15, marginRight: 20 }}>
            <Text style={{ color: "#0a356d", height: 22, fontSize: 14, fontWeight: '600' }}>Environment Details</Text>

            <Text>The extended bug report basically consists of three fields: steps to reproduce, actual results, and expected results. This is where your QA team, beta testers, or users can dive more into the details about what happened that led to the bug and explain what the expected results were and what the outcome eventually was.</Text>
            <Text>In terms of the repro steps, users should describe the step by step flow that led them to face the reported bug. This should be an actual list of anything and everything they clicked on, navigated to, or any other action they performed in the mobile app that could have caused the problem. This helps the developers to be able to retrace the steps to reproduce the bug, see where the actual problem was along the way, and fix it accordingly.</Text>
          </View>
          <View style={{ marginLeft: 20, marginTop: 15, marginRight: 20 }}>
            <Text style={{ color: "#0a356d", height: 22, fontSize: 14, fontWeight: '600' }}>Environment Details</Text>

            <Text>Tornadoes are known as one of the most damaging disasters. What is the description of tornadoes? A tornado is a very powerful column of winds which spirals around a center of low atmospheric pressure. A tornado will look like a large black funnel which hangs down from a storm cloud.
            The name "tornado" derives from the Latin "tonare". It means "to thunder." While the Spanish developed the word into "tornear" which means "to turn or twist". This is why a tornado is sometimes called twister or cyclone.

This is another reason why using a bug reporting tool is perfect as it automatically captures user steps, network logs, and all device details to help you know exactly why a bug happened so you can spend your time fixing rather than debugging.</Text>
            <Text>In terms of the repro steps, users should describe the step by step flow that led them to face the reported bug. This should be an actual list of anything and everything they clicked on, navigated to, or any other action they performed in the mobile app that could have caused the problem. This helps the developers to be able to retrace the steps to reproduce the bug, see where the actual problem was along the way, and fix it accordingly.</Text>
          </View>
        </ScrollView>
      </View>
    }
    return render()
}

export default Report