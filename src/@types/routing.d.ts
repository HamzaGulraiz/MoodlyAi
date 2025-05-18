type NavigationProps = {
  navigate(route: string, Params?: any): ReactNavigation.RootParamList
  goBack(): ReactNavigation.RootParamList
  setOptions: (arg: any) => void
  closeDrawer: () => void
  canGoBack: () => void
  replace(route: string, Params?: any): ReactNavigation.RootParamList
  addListener: (event: string, callback: (e: any) => void) => void
  removeListener: (event: string, callback: (e: any) => void) => void
  dispatch: (action: any) => void
  pop: (action: any) => void
}
