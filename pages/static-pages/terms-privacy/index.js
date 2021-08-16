import React, { Component, useEffect, useState, useRef } from 'react';
import { Text,View,ScrollView } from 'react-native';

const TermsPrivacy =(props)=>{


    const render =()=>{
        return <View style={{ flex: 1, backgroundColor: 'white' }}>

        <ScrollView style={{ marginTop: 10, }}>
          {/* Account design */}
          <View style={{ marginLeft: 20, marginTop: 15, marginRight: 20 }}>
            <Text style={{ color: "#0a356d", height: 22, fontSize: 14, fontWeight: '600' }}>What is an App Privacy Policy?</Text>

            <Text>A mobile app privacy policy is a legal statement that discloses how a party gathers, stores, and uses the personal information it collects from app users. Personal information refers to anything that can be used to identify an individual, including names, phone numbers, email addresses, device IDs, and locations.

These policies are used by companies and mobile app developers to stay compliant with federal laws. They fulfill the legal requirement to safeguard user privacy while also protecting the company itself from legal challenges.</Text>
          </View>

 {/* Account design */}
 <View style={{ marginLeft: 20, marginTop: 15, marginRight: 20 }}>
            <Text style={{ color: "#0a356d", height: 22, fontSize: 14, fontWeight: '600' }}>Do You Need a Privacy Policy for Your Android or iOS App?</Text>

            <Text>The short answer is yes, you probably need one. With the legal environment surrounding internet privacy in near-constant flux, there is a good chance that a law, regulation, affiliate, or platform requires that your mobile app includes such a policy. There are even several reasons why your app might be removed from the App store or Google Play if you do not have a privacy policy:</Text>
          </View>
          <View style={{ marginLeft: 20, marginTop: 15, marginRight: 20 }}>
            <Text style={{ color: "#0a356d", height: 22, fontSize: 14, fontWeight: '600' }}>Your App Uses a Third Party Service Provider</Text>

            <Text>If you employ a third-party service provider that gathers user data, you are required to include one–even if your app doesn’t collect the data itself. You are responsible for disclosing what and how user data is gathered and used on your app.</Text>
            <Text>In terms of the repro steps, users should describe the step by step flow that led them to face the reported bug. This should be an actual list of anything and everything they clicked on, navigated to, or any other action they performed in the mobile app that could have caused the problem. This helps the developers to be able to retrace the steps to reproduce the bug, see where the actual problem was along the way, and fix it accordingly.</Text>
            <Text>Additionally, third-party services often use cookies that gather and store personal information. It is your responsibility to know and understand whether they do — and if they do, you must include an appropriate app privacy policy.</Text>
          </View>
        </ScrollView>
      </View>
    }
    return render()
}

export default TermsPrivacy