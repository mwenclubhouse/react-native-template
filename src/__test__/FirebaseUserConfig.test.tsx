import {expect} from "chai";
import FirebaseInterface from "../FirebaseInterface";

describe("Firebase Database", () => {
    it("Simple Test", () => {
        expect("Hello There").equal("Hello There");
    });
    it("Connect to Database", () => {
        FirebaseInterface.shared = new FirebaseInterface();
        let database = FirebaseInterface.getCollectionDatabase();
    })
});
