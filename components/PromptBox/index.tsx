import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { MotiView, useAnimationState } from "moti";
import { Cancel } from "../Icons";
import { memo, useCallback, useRef } from "react";
import { usePromptStore } from "@/stores";
import constants from "@/constants";

const MAX_LENGTH = 500;

const PromptBox = () => {
  const { prompt, setPrompt, setSubmitting, isSubmitting, clearPrompt } =
    usePromptStore();
  const animatingRef = useRef(false);

  const shakeAnimation = useAnimationState({
    from: {
      translateX: 0,
    },
    to: {
      translateX: [0, -5, 5, -5, 5, -2, 2, 0],
    },
  });

  const onSuppriseMePress = useCallback(() => {
    if (animatingRef.current) return;

    animatingRef.current = true;
    shakeAnimation.transitionTo("from");

    // Set the prompt
    setPrompt(
      constants.SUPRISE_ME_PROMPTS[
        Math.floor(Math.random() * constants.SUPRISE_ME_PROMPTS.length)
      ]
    );

    // Reset animation state after it completes
    setTimeout(() => {
      shakeAnimation.transitionTo("from");
      animatingRef.current = false;
    }, 300);
  }, []);

  return (
    <View className="flex flex-col items-center justify-center gap-3 mx-6">
      <View className="flex flex-row items-center justify-between w-full">
        <Text className="text-neutral-50 font-extrabold leading-normal text-xl font-serif">
          Enter Your Prompt
        </Text>
        <MotiView
          state={shakeAnimation}
          transition={{ type: "timing", duration: 250 }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            disabled={isSubmitting}
            onPress={onSuppriseMePress}
          >
            <Text className="text-neutral-50 text-[13px] font-normal font-serif">
              🎲 Suprise me
            </Text>
          </TouchableOpacity>
        </MotiView>
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
          className="p-3 h-80 w-full bg-zinc-800 rounded-2xl self-stretch justify-center text-neutral-50 text-base font-normal font-serif leading-tight focus:border-2 focus:border-neutral-50 focus:outline-none"
        />
        <View className="flex flex-row items-end justify-between w-full absolute bottom-0 px-3 pb-3">
          <Text className="text-zinc-400 text-xs font-normal leading-3 font-serif">
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
