import React from 'react';
import { expect } from 'chai';
import FirebaseInterface from "../FirebaseInterface";


describe("Firebase Database", () => {
    it("Simple Test", () => {
        expect("Hello There").equal("Hello There");
    });
    it("Connect to Database", () => {
        let database = FirebaseInterface.getDatabase();
    })
    it("Login with Facebook", async () => {
        await FirebaseInterface.loginWithFacebook();
    })
});