export enum AnimateActionEnum {
  Hidden = 'Hidden',
  Visible = 'Visible',

  FadeIn = 'FadeIn',
  FadeInUp = 'FadeInUp',
  FadeInUpBig = 'FadeInUpBig',
  FadeInDown = 'FadeInDown',
  FadeInDownBig = 'FadeInDownBig',
  FadeInLeft = 'FadeInLeft',
  FadeInLeftBig = 'FadeInLeftBig',
  FadeInRight = 'FadeInRight',
  FadeInRightBig = 'FadeInRightBig',

  FadeOut = 'FadeOut',
  FadeOutUp = 'FadeOutUp',
  FadeOutUpBig = 'FadeOutUpBig',
  FadeOutDown = 'FadeOutDown',
  FadeOutDownBig = 'FadeOutDownBig',
  FadeOutLeft = 'FadeOutLeft',
  FadeOutLeftBig = 'FadeOutLeftBig',
  FadeOutRight = 'FadeOutRight',
  FadeOutRightBig = 'FadeOutRightBig',

  BounceInUp = 'BounceInUp',
  BounceInUpBig = 'BounceInUpBig',
  BounceInDown = 'BounceInDown',
  BounceInDownBig = 'BounceInDownBig',
  BounceInLeft = 'BounceInLeft',
  BounceInLeftBig = 'BounceInLeftBig',
  BounceInRight = 'BounceInRight',
  BounceInRightBig = 'BounceInRightBig',

  BounceOutUp = 'BounceOutUp',
  BounceOutDown = 'BounceOutDown',
  BounceOutDownBig = 'BounceOutDownBig',
  BounceOutLeft = 'BounceOutLeft',
  BounceOutLeftBig = 'BounceOutLeftBig',
  BounceOutRight = 'BounceOutRight',
  BounceOutRightBig = 'BounceOutRightBig',

  ZoomIn = 'ZoomIn'
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
  ]);

  static getItem(animateActionEnum: AnimateActionEnum | undefined): AnimateActionEnum | undefined {
    return animateActionEnum != null ? AnimateActionAlias.aliasMap.get(animateActionEnum) : undefined;
  }

}
