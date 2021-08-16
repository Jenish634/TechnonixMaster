import React, { Component, useEffect, useState, useRef } from 'react';
import { Text,View,ScrollView } from 'react-native';

const HelpCenter =(props)=>{


    const render =()=>{
        return <View style={{ flex: 1, backgroundColor: 'white' }}>

        <ScrollView style={{ marginTop: 10, }}>
        
          {/* Account design */}
          <View style={{ marginLeft: 20, marginTop: 15, marginRight: 20 }}>
            <Text style={{ color: "#0a356d", height: 22, fontSize: 14, fontWeight: '600' }}>Help centre tip</Text>

            <Text>To avoid customers churning early in their journey, make the value you offer clear during your onboarding message campaign. Do this by reiterating some of the benefits your product offers or by highlighting the solutions your product offers when catering to the challenges customers experience. Also, use your welcome message to guide customers during their first interaction with your product. One option is to include a link to product tips in your product intro message. For example, link to a page on your website to make it easy for new customers to find what they need.</Text>
          </View>

 {/* Account design */}
 <View style={{ marginLeft: 20, marginTop: 15, marginRight: 20 }}>
            <Text style={{ color: "#0a356d", height: 22, fontSize: 14, fontWeight: '600' }}>Environment Details</Text>

            <Text>As your customer communication becomes more strategic, find out where along the customer journey they’re leaving. Decide which templates you need to focus on and upload them to VoiceSage. You can even set up automatic drip campaigns that send your messages at specific intervals.</Text>
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

export default HelpCenter