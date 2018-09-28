package com.viroignite;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.airbnb.android.react.maps.MapsPackage;
import com.airlabsinc.RNAWSCognitoPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import expo.adapters.react.ModuleRegistryAdapter;
import expo.adapters.react.ReactModuleRegistryProvider;
import expo.adapters.react.ReactAdapterPackage;
import expo.core.ModuleRegistryProvider;
import expo.core.interfaces.Package;
import expo.modules.location.LocationPackage;
import expo.modules.permissions.PermissionsPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import com.viromedia.bridge.ReactViroPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  private final ModuleRegistryProvider mModuleRegistryProvider = new ReactModuleRegistryProvider(Arrays.<Package>asList(
    new ReactAdapterPackage(),
    new LocationPackage(),
    new PermissionsPackage()
  ));

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new ReactViroPackage(ReactViroPackage.ViroPlatform.valueOf(BuildConfig.VR_PLATFORM)),
            new MapsPackage(),
            new RNAWSCognitoPackage(),
            new ReactNativeConfigPackage(),
            new VectorIconsPackage(),
            new ModuleRegistryAdapter(mModuleRegistryProvider),
            new RNDeviceInfo()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
