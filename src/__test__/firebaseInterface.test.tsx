import React from 'react';
import { expect } from 'chai';
import firebaseInterface from "../firebaseInterface";


describe("Firebase Database", () => {
    it("Simple Test", () => {
        expect("Hello There").equal("Hello There");
    });
    it("Connect to Database", () => {
        let database = firebaseInterface.getDatabase();
    })
    it("Login with Facebook", async () => {
        await firebaseInterface.loginWithFacebook();
    })
});