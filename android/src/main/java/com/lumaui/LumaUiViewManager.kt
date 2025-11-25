package com.lumaui

import android.graphics.Color
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.LumaUiViewManagerInterface
import com.facebook.react.viewmanagers.LumaUiViewManagerDelegate

@ReactModule(name = LumaUiViewManager.NAME)
class LumaUiViewManager : SimpleViewManager<LumaUiView>(),
  LumaUiViewManagerInterface<LumaUiView> {
  private val mDelegate: ViewManagerDelegate<LumaUiView>

  init {
    mDelegate = LumaUiViewManagerDelegate(this)
  }

  override fun getDelegate(): ViewManagerDelegate<LumaUiView>? {
    return mDelegate
  }

  override fun getName(): String {
    return NAME
  }

  public override fun createViewInstance(context: ThemedReactContext): LumaUiView {
    return LumaUiView(context)
  }

  @ReactProp(name = "color")
  override fun setColor(view: LumaUiView?, color: String?) {
    view?.setBackgroundColor(Color.parseColor(color))
  }

  companion object {
    const val NAME = "LumaUiView"
  }
}
