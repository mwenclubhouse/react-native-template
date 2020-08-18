package com.matthewwen.purduect.Modules;

import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.RemoteException;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.altbeacon.beacon.Beacon;
import org.altbeacon.beacon.BeaconConsumer;
import org.altbeacon.beacon.BeaconManager;
import org.altbeacon.beacon.BeaconParser;
import org.altbeacon.beacon.BeaconTransmitter;
import org.altbeacon.beacon.MonitorNotifier;
import org.altbeacon.beacon.Region;

//import org.altbeacon.beacon.BeaconConsumer;

//import org.altbeacon.beacon.MonitorNotifier;
//import org.altbeacon.beacon.Region;

public class BluetoothModule extends ReactContextBaseJavaModule implements BeaconConsumer {

    private BeaconManager manager;
    private String userUid;
    Beacon beacon;
    BeaconParser beaconParser;
    BeaconTransmitter beaconTransmitter;

    public BluetoothModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "BluetoothModule";
    }

    //Custom function that we are going to export to JS
    @ReactMethod
    public void showToast(String message) {
        Toast.makeText(getReactApplicationContext(), message, Toast.LENGTH_SHORT).show();
    }

    @ReactMethod
    public void bindManger() {
        this.bindManager(this.userUid);
    }

    @ReactMethod
    public void bindManager(String userUid) {
        this.userUid = userUid;
        beacon = new Beacon.Builder()
                .setId1("2f234454-cf6d-4a0f-adf2-f4911ba9ffa6")
                .setId2("1")
                .setId3("2")
                .setManufacturer(0x004c)
                .setTxPower(-59)
                .build();
        Toast.makeText(getReactApplicationContext(), "Hello There Beacon", Toast.LENGTH_SHORT).show();
        beaconParser = new BeaconParser().setBeaconLayout("m:2-3=0215,i:4-19,i:20-21,i:22-23,p:24-24");
        beaconTransmitter = new BeaconTransmitter(getApplicationContext(), beaconParser);
        beaconTransmitter.startAdvertising(beacon);
    }

    @ReactMethod
    public void unbindManager() {
        Toast.makeText(getReactApplicationContext(), "Manager UNBIND", Toast.LENGTH_SHORT).show();
        manager.unbind(this);
    }

    @ReactMethod
    public void setUid(String userUid) {
        this.userUid = userUid;
    }


    @Override
    public void onBeaconServiceConnect() {
        if (manager == null) {
            Toast.makeText(getReactApplicationContext(), "Manager is NULL", Toast.LENGTH_SHORT).show();
            return;
        }
        manager.removeAllMonitorNotifiers();
        manager.addMonitorNotifier(new MonitorNotifier() {
            @Override
            public void didEnterRegion(Region region) {
                Toast.makeText(getReactApplicationContext(),
                        "I just saw an beacon for the first time!",
                        Toast.LENGTH_SHORT).show();
            }

            @Override
            public void didExitRegion(Region region) {
                Toast.makeText(getReactApplicationContext(),
                        "I no longer see an becaon",
                        Toast.LENGTH_SHORT).show();
            }

            @Override
            public void didDetermineStateForRegion(int i, Region region) {
                Toast.makeText(getReactApplicationContext(),
                        "I have just switched from seeing/not seeing becaons",
                        Toast.LENGTH_SHORT).show();
            }
        });
        try {
            manager.startMonitoringBeaconsInRegion(new Region("unique id", null, null, null));
        }
        catch (RemoteException e) {
            Toast.makeText(getReactApplicationContext(),
                    "Ran into a Remote Exception", Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    public Context getApplicationContext() {
        return getReactApplicationContext();
    }

    @Override
    public void unbindService(ServiceConnection serviceConnection) {

    }

    @Override
    public boolean bindService(Intent intent, ServiceConnection serviceConnection, int i) {
        return false;
    }
}
