"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import EmojiPicker, { EmojiStyle, Theme } from "emoji-picker-react";
import { useTheme } from "next-themes";

interface IconPickerProps {
  onChange: (icon: string) => void;
  children: React.ReactNode;
  asChild?: boolean;
}

const themeMap: Record<string, Theme> = {
  light: Theme.LIGHT,
  dark: Theme.DARK,
};

function IconPicker({ onChange, children, asChild = false }: IconPickerProps) {
  const { resolvedTheme } = useTheme();

  const currentTheme = resolvedTheme || "light";
  const emojiPickerTheme = themeMap[currentTheme];

  return (
    <Popover>
      <PopoverTrigger asChild={asChild}>{children}</PopoverTrigger>
      <PopoverContent className="p-0 w-3xs md:w-sm" align="start">
        <EmojiPicker
          theme={emojiPickerTheme}
          onEmojiClick={(emoji) => onChange(emoji.emoji)}
          width={"100%"}
          height={"350px"}
          lazyLoadEmojis
          emojiStyle={EmojiStyle.NATIVE}
        />
      </PopoverContent>
    </Popover>
  );
}
export default IconPicker;
