import React from 'react';
import {expect} from 'chai';
import FirebaseInterface from "../FirebaseInterface";
import FirebaseUserConfig from "../FirebaseUserConfig";
import FirebaseCredential from "../FirebaseCredential";


describe("Firebase Database", () => {
    it("Simple Test", () => {
        expect("Hello There").equal("Hello There");
    });
    it("Connect to Database", () => {
        FirebaseInterface.shared = new FirebaseInterface();
        let database = FirebaseInterface.getRealTimeDatabase();
    })
    it("Login with email", async () => {
        FirebaseInterface.shared = new FirebaseInterface();
        FirebaseInterface.getCurrentUser = () => {
            return {uid: "JFWANfEUWZUjDPeD0PaDzlpoPUk2"};
        }
        FirebaseCredential.onLoggedIn = (handler) => {handler(FirebaseInterface.getCurrentUser())}
        await FirebaseUserConfig.sendListCalendar([]);
        expect("Hello", "Hello");
    })
});