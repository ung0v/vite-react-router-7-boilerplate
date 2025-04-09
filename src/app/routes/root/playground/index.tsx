import { AccordionDemo } from './components/accordion-demo'
import { AlertDemo } from './components/alert-demo'
import { AlertDialogDemo } from './components/alert-dialog-demo'
import { AspectRatioDemo } from './components/aspect-ratio-demo'
import { AvatarDemo } from './components/avatar-demo'
import { BadgeDemo } from './components/badge-demo'
import { BadgeDestructive } from './components/badge-destructive'
import { BadgeOutline } from './components/badge-outline'
import { BadgeSecondary } from './components/badge-secondary'
import { BreadcrumbDemo } from './components/breadcrumb-demo'
import { ButtonDemo } from './components/button-demo'
import { ButtonDestructive } from './components/button-destructive'
import { ButtonGhost } from './components/button-ghost'
import { ButtonLink } from './components/button-link'
import { ButtonLoading } from './components/button-loading'
import { ButtonOutline } from './components/button-outline'
import { ButtonSecondary } from './components/button-secondary'
import { ButtonWithIcon } from './components/button-with-icon'
import { CalendarDemo } from './components/calendar-demo'
import { CardDemo } from './components/card-demo'
import { CarouselDemo } from './components/carousel-demo'
import { CheckboxDemo } from './components/checkbox-demo'
import { CollapsibleDemo } from './components/collapsible-demo'
import { ComboboxDemo } from './components/combobox-demo'
import { CommandDemo } from './components/command-demo'
import { ComponentWrapper } from './components/component-wrapper'
import { ContextMenuDemo } from './components/context-menu-demo'
import { DatePickerDemo } from './components/date-picker-demo'
import { DialogDemo } from './components/dialog-demo'
import { DrawerDemo } from './components/drawer-demo'
import { DropdownMenuDemo } from './components/dropdown-menu-demo'
import { HoverCardDemo } from './components/hover-card-demo'
import { InputDemo } from './components/input-demo'
import { InputOTPDemo } from './components/input-otp-demo'
import { LabelDemo } from './components/label-demo'
import { MenubarDemo } from './components/menubar-demo'
import { NavigationMenuDemo } from './components/navigation-menu-demo'
import { PaginationDemo } from './components/pagination-demo'
import { PopoverDemo } from './components/popover-demo'
import { ProgressDemo } from './components/progress-demo'
import { RadioGroupDemo } from './components/radio-group-demo'
import { ResizableHandleDemo } from './components/resizable-handle'
import { ScrollAreaDemo } from './components/scroll-area-demo'
import { SelectDemo } from './components/select-demo'
import { SeparatorDemo } from './components/separator-demo'
import { SheetDemo } from './components/sheet-demo'
import { SkeletonDemo } from './components/skeleton-demo'
import { SliderDemo } from './components/slider-demo'
import { SonnerDemo } from './components/sonner-demo'
import { SwitchDemo } from './components/switch-demo'
import { TableDemo } from './components/table-demo'
import { TabsDemo } from './components/tabs-demo'
import { TextareaDemo } from './components/textarea-demo'
import { ToastDemo } from './components/toast-demo'
import { ToggleDemo } from './components/toggle-demo'
import { ToggleDisabled } from './components/toggle-disabled'
import { ToggleGroupDemo } from './components/toggle-group-demo'
import { ToggleOutline } from './components/toggle-outline'
import { ToggleWithText } from './components/toggle-with-text'
import { TooltipDemo } from './components/tooltip-demo'

export default function SinkPage() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <ComponentWrapper name="Accordion">
        <AccordionDemo />
      </ComponentWrapper>
      <ComponentWrapper name="Alert">
        <AlertDemo />
      </ComponentWrapper>
      <ComponentWrapper name="AlertDialog">
        <AlertDialogDemo />
      </ComponentWrapper>
      <ComponentWrapper name="AspectRatio">
        <AspectRatioDemo />
      </ComponentWrapper>
      <ComponentWrapper name="Avatar">
        <AvatarDemo />
      </ComponentWrapper>
      <ComponentWrapper name="Badge">
        <BadgeDemo />
        <BadgeDestructive />
        <BadgeOutline />
        <BadgeSecondary />
      </ComponentWrapper>
      <ComponentWrapper name="Breadcrumb">
        <BreadcrumbDemo />
      </ComponentWrapper>
      <ComponentWrapper name="Button">
        <div className="flex items-center gap-2">
          <ButtonDemo />
          <ButtonDestructive />
          <ButtonGhost />
          <ButtonLink />
        </div>
        <div className="flex items-center gap-2">
          <ButtonLoading />
          <ButtonOutline />
          <ButtonSecondary />
        </div>
        <div className="flex items-center gap-2">
          <ButtonWithIcon />
        </div>
      </ComponentWrapper>
      <ComponentWrapper name="Calendar">
        <CalendarDemo />
      </ComponentWrapper>
      <ComponentWrapper name="Card">
        <CardDemo className="w-full" />
      </ComponentWrapper>
      <ComponentWrapper name="Carousel" className="[&_.max-w-xs]:max-w-[70%]">
        <CarouselDemo />
      </ComponentWrapper>
      <ComponentWrapper name="Checkbox">
        <CheckboxDemo />
      </ComponentWrapper>
      <ComponentWrapper name="Collapsible">
        <CollapsibleDemo />
      </ComponentWrapper>
      <ComponentWrapper name="Combobox">
        <ComboboxDemo />
      </ComponentWrapper>
      <ComponentWrapper name="Command" className="[&_[cmdk-root]]:md:min-w-max">
        <CommandDemo />
      </ComponentWrapper>
      <ComponentWrapper name="ContextMenu">
        <ContextMenuDemo />
      </ComponentWrapper>
      <ComponentWrapper name="DatePicker">
        <DatePickerDemo />
      </ComponentWrapper>
      <ComponentWrapper name="Dialog">
        <DialogDemo />
      </ComponentWrapper>
      <ComponentWrapper name="Drawer">
        <DrawerDemo />
      </ComponentWrapper>
      <ComponentWrapper name="DropdownMenu">
        <DropdownMenuDemo />
      </ComponentWrapper>
      <ComponentWrapper name="HoverCard">
        <HoverCardDemo />
      </ComponentWrapper>
      <ComponentWrapper name="Input">
        <InputDemo />
      </ComponentWrapper>
      <ComponentWrapper name="InputOTP">
        <InputOTPDemo />
      </ComponentWrapper>
      <ComponentWrapper name="Label">
        <LabelDemo />
      </ComponentWrapper>
      <ComponentWrapper name="Menubar">
        <MenubarDemo />
      </ComponentWrapper>
      <ComponentWrapper name="NavigationMenu" className="col-span-2">
        <NavigationMenuDemo />
      </ComponentWrapper>
      <ComponentWrapper name="Pagination">
        <PaginationDemo />
      </ComponentWrapper>
      <ComponentWrapper name="Popover">
        <PopoverDemo />
      </ComponentWrapper>
      <ComponentWrapper name="Progress">
        <ProgressDemo />
      </ComponentWrapper>
      <ComponentWrapper name="RadioGroup">
        <RadioGroupDemo />
      </ComponentWrapper>
      <ComponentWrapper name="Resizable" className="col-span-2">
        <ResizableHandleDemo />
      </ComponentWrapper>
      <ComponentWrapper name="ScrollArea">
        <ScrollAreaDemo />
      </ComponentWrapper>
      <ComponentWrapper name="Select">
        <SelectDemo />
      </ComponentWrapper>
      <ComponentWrapper name="Separator">
        <SeparatorDemo />
      </ComponentWrapper>
      <ComponentWrapper name="Sheet">
        <SheetDemo />
      </ComponentWrapper>
      <ComponentWrapper name="Skeleton">
        <SkeletonDemo />
      </ComponentWrapper>
      <ComponentWrapper name="Slider">
        <SliderDemo />
      </ComponentWrapper>
      <ComponentWrapper name="Sonner">
        <SonnerDemo />
      </ComponentWrapper>
      <ComponentWrapper name="Switch">
        <SwitchDemo />
      </ComponentWrapper>
      <ComponentWrapper name="Table" className="col-span-2">
        <TableDemo />
      </ComponentWrapper>
      <ComponentWrapper name="Tabs">
        <TabsDemo />
      </ComponentWrapper>
      <ComponentWrapper name="Textarea">
        <TextareaDemo />
      </ComponentWrapper>
      <ComponentWrapper name="Toast">
        <ToastDemo />
      </ComponentWrapper>
      <ComponentWrapper name="Toggle">
        <div className="flex items-center gap-2">
          <ToggleDemo />
          <ToggleDisabled />
          <ToggleOutline />
          <ToggleWithText />
        </div>
      </ComponentWrapper>
      <ComponentWrapper name="ToggleGroup">
        <ToggleGroupDemo />
      </ComponentWrapper>
      <ComponentWrapper name="Tooltip">
        <TooltipDemo />
      </ComponentWrapper>
    </div>
  )
}
