export enum AnimateActionEnum {
  Hidden = 'hidden',
  Visible = 'visible',

  FadeIn = 'fadeIn',
  FadeInUp = 'fadeInUp',
  FadeInUpBig = 'fadeInUpBig',
  FadeInDown = 'fadeInDown',
  FadeInDownBig = 'fadeInDownBig',
  FadeInLeft = 'fadeInLeft',
  FadeInLeftBig = 'fadeInLeftBig',
  FadeInRight = 'fadeInRight',
  FadeInRightBig = 'fadeInRightBig',

  FadeOut = 'fadeOut',
  FadeOutUp = 'fadeOutUp',
  FadeOutUpBig = 'fadeOutUpBig',
  FadeOutDown = 'fadeOutDown',
  FadeOutDownBig = 'fadeOutDownBig',
  FadeOutLeft = 'fadeOutLeft',
  FadeOutLeftBig = 'fadeOutLeftBig',
  FadeOutRight = 'fadeOutRight',
  FadeOutRightBig = 'fadeOutRightBig',

  BounceInUp = 'bounceInUp',
  BounceInUpBig = 'bounceInUpBig',
  BounceInDown = 'bounceInDown',
  BounceInDownBig = 'bounceInDownBig',
  BounceInLeft = 'bounceInLeft',
  BounceInLeftBig = 'bounceInLeftBig',
  BounceInRight = 'bounceInRight',
  BounceInRightBig = 'bounceInRightBig',

  BounceOutUp = 'bounceOutUp',
  BouncOutUpBig = 'bounceOutUpBig',
  BounceOutDown = 'bounceOutDown',
  BounceOutDownBig = 'bounceOutDownBig',
  BounceOutLeft = 'bounceOutLeft',
  BounceOutLeftBig = 'bounceOutLeftBig',
  BounceOutRight = 'bounceOutRight',
  BounceOutRightBig = 'bounceOutRightBig',

  ZoomIn = 'zoomIn',
  ZoomOut = 'zoomOut'
}

export class AnimateActionAlias {
  private static readonly aliasMap: Map<AnimateActionEnum, AnimateActionEnum> = new Map([
    [AnimateActionEnum.Visible, AnimateActionEnum.Visible],

    [AnimateActionEnum.FadeIn, AnimateActionEnum.Visible],
    [AnimateActionEnum.FadeInUp, AnimateActionEnum.Visible],
    [AnimateActionEnum.FadeInUpBig, AnimateActionEnum.Visible],
    [AnimateActionEnum.FadeInDown, AnimateActionEnum.Visible],
    [AnimateActionEnum.FadeInDownBig, AnimateActionEnum.Visible],
    [AnimateActionEnum.FadeInLeft, AnimateActionEnum.Visible],
    [AnimateActionEnum.FadeInLeftBig, AnimateActionEnum.Visible],
    [AnimateActionEnum.FadeInRight, AnimateActionEnum.Visible],
    [AnimateActionEnum.FadeInRightBig, AnimateActionEnum.Visible],

    [AnimateActionEnum.BounceInUp, AnimateActionEnum.Visible],
    [AnimateActionEnum.BounceInUpBig, AnimateActionEnum.Visible],
    [AnimateActionEnum.BounceInDown, AnimateActionEnum.Visible],
    [AnimateActionEnum.BounceInDownBig, AnimateActionEnum.Visible],
    [AnimateActionEnum.BounceInLeft, AnimateActionEnum.Visible],
    [AnimateActionEnum.BounceInLeftBig, AnimateActionEnum.Visible],
    [AnimateActionEnum.BounceInRight, AnimateActionEnum.Visible],
    [AnimateActionEnum.BounceInRightBig, AnimateActionEnum.Visible],

    [AnimateActionEnum.ZoomIn, AnimateActionEnum.Visible],

    [AnimateActionEnum.Hidden, AnimateActionEnum.Hidden],

    [AnimateActionEnum.FadeOut, AnimateActionEnum.Hidden],
    [AnimateActionEnum.FadeOutUp, AnimateActionEnum.Hidden],
    [AnimateActionEnum.FadeOutDown, AnimateActionEnum.Hidden],
    [AnimateActionEnum.FadeOutDownBig, AnimateActionEnum.Hidden],
    [AnimateActionEnum.FadeOutLeft, AnimateActionEnum.Hidden],
    [AnimateActionEnum.FadeOutLeftBig, AnimateActionEnum.Hidden],
    [AnimateActionEnum.FadeOutRight, AnimateActionEnum.Hidden],
    [AnimateActionEnum.FadeOutRightBig, AnimateActionEnum.Hidden],

    [AnimateActionEnum.BounceOutUp, AnimateActionEnum.Hidden],
    [AnimateActionEnum.BounceOutDown, AnimateActionEnum.Hidden],
    [AnimateActionEnum.BounceOutDownBig, AnimateActionEnum.Hidden],
    [AnimateActionEnum.BounceOutLeft, AnimateActionEnum.Hidden],
    [AnimateActionEnum.BounceOutLeftBig, AnimateActionEnum.Hidden],
    [AnimateActionEnum.BounceOutRight, AnimateActionEnum.Hidden],
    [AnimateActionEnum.BounceOutRightBig, AnimateActionEnum.Hidden],

    [AnimateActionEnum.ZoomOut, AnimateActionEnum.Hidden],
  ]);

  static getItem(animateActionEnum: AnimateActionEnum | undefined): AnimateActionEnum | undefined {
    return animateActionEnum != null ? AnimateActionAlias.aliasMap.get(animateActionEnum) : undefined;
  }

  static isEqual(animationEnum1: AnimateActionEnum, animationEnum2: AnimateActionEnum): boolean {
    const a1 = AnimateActionAlias.getItem(animationEnum1);
    const a2 = AnimateActionAlias.getItem(animationEnum2);
    return a1 === a2;
  }

}
