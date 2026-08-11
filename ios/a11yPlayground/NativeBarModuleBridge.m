#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(NativeBarModule, NSObject)

RCT_EXTERN_METHOD(presentNativeBarDemo)
RCT_EXTERN_METHOD(presentNativeTabBarDemo:(NSDictionary *)options)
RCT_EXTERN_METHOD(setLiquidGlassTabBarHidden:(BOOL)hidden animated:(BOOL)animated)

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

@end

