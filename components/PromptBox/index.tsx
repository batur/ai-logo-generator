import { View, Text, TouchableOpacity, TextInput } from "react-native";

import { Cancel } from "../Icons";
import { memo } from "react";
import { usePromptStore } from "@/stores";
import constants from "@/constants";

const MAX_LENGTH = 500;

const PromptBox = () => {
  const { prompt, setPrompt, setSubmitting, isSubmitting, clearPrompt } =
    usePromptStore();

  const onSuppriseMePress = () => {
    return setPrompt(
      constants.SUPRISE_ME_PROMPTS[
        Math.floor(Math.random() * constants.SUPRISE_ME_PROMPTS.length)
      ]
    );
  };
  return (
    <View className="flex flex-col items-center justify-center gap-3 mx-6">
      <View className="flex flex-row items-center justify-between w-full">
        <Text className="text-neutral-50 font-extrabold leading-normal text-xl">
          Enter Your Prompt
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          disabled={isSubmitting}
          onPress={onSuppriseMePress}
        >
          <Text className="text-neutral-50 text-[13px] font-normal">
            🎲 Suprise me
          </Text>
        </TouchableOpacity>
      </View>
      <View className="w-full h-max relative">
        <TextInput
          value={prompt}
          onChangeText={setPrompt}
          maxLength={MAX_LENGTH}
          multiline
          submitBehavior="blurAndSubmit"
          onSubmitEditing={setSubmitting}
          placeholderTextColor={constants.NEUTRAL_WHITE}
          placeholder="A blue lion logo reading ‘HEXA’ in bold letters"
          className="p-3 h-80 w-full bg-zinc-800 rounded-2xl self-stretch justify-center text-neutral-50 text-base font-normal leading-tight focus:border-2 focus:border-neutral-50 focus:outline-none"
        />
        <View className="flex flex-row items-end justify-between w-full absolute bottom-0 px-3 pb-3">
          <Text className="text-zinc-500 text-xs font-normal leading-3">
            {prompt.length}/{MAX_LENGTH}
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={clearPrompt}
            disabled={isSubmitting || prompt.length === 0}
            className="disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Cancel color={constants.NEUTRAL_WHITE} width={20} height={20} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default memo(PromptBox);
