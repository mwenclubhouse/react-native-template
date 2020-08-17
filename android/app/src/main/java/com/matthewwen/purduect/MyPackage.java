package com.matthewwen.purduect;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.matthewwen.purduect.Modules.BluetoothModule;
import com.matthewwen.purduect.Modules.ToastModule;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class MyPackage implements ReactPackage {
    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule>  modules = new ArrayList<>();
        modules.add(new ToastModule(reactContext));
        modules.add(new BluetoothModule(reactContext));
        return modules;
    }
}
