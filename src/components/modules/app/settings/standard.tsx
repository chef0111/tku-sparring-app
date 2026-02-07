import { useState } from 'react';
import { Plus } from 'lucide-react';
import { PlayerAvatar } from '../hud/player-avatar';
import { avatarGroup, durationGroup, playerGroup } from './constant/form';
import type z from 'zod';
import type { StandardSettingsSchema } from '@/lib/validations';
import { useAppForm } from '@/components/form/hooks';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

type FormData = z.infer<typeof StandardSettingsSchema>;

export const StandardSettings = () => {
  const [avatarPreviews, setAvatarPreviews] = useState<{
    redPlayerAvatar?: string;
    bluePlayerAvatar?: string;
  }>({});

  const [fileNames, setFileNames] = useState<{
    redPlayerAvatar?: string;
    bluePlayerAvatar?: string;
  }>({});

  const form = useAppForm({
    defaultValues: {
      redPlayerAvatar: undefined,
      bluePlayerAvatar: undefined,
      redPlayerName: '',
      bluePlayerName: '',
      roundDuration: 60,
      breakDuration: 30,
      maxHealth: 120,
    } satisfies FormData as FormData,
  });

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: 'redPlayerAvatar' | 'bluePlayerAvatar'
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreviews((prev) => ({ ...prev, [name]: previewUrl }));
      setFileNames((prev) => ({ ...prev, [name]: file.name }));
    }
  };

  return (
    <FieldSet className="font-esbuild w-full">
      <FieldGroup className="settings-field-group">
        <FieldLabel className="settings-group-label">
          SELECT PLAYER AVATARS
        </FieldLabel>
        <FieldGroup className="flex-row">
          {avatarGroup.map((player) => (
            <FieldGroup key={player.name} className="avatar-group">
              <FieldLabel className="font-bold tracking-wider">
                {player.label}
              </FieldLabel>
              <FieldGroup className="flex-row items-start">
                <PlayerAvatar
                  name={player.playerName}
                  image={avatarPreviews[player.name] || ''}
                  className={player.className}
                  fallback={
                    <img src={player.fallback} alt={player.playerName} />
                  }
                />
                <form.AppField name={player.name}>
                  {(field) => (
                    <Field className="truncate">
                      <Button
                        variant="outline"
                        className="relative h-auto w-full items-center gap-3 overflow-visible px-2 py-3 shadow-sm"
                        render={
                          <Label className="flex w-full cursor-pointer items-center">
                            <Plus className="ml-2 size-6" />
                            <div className="flex flex-col items-start text-center text-lg leading-tight tracking-wider">
                              <span>Choose</span>
                              <span>Avatar</span>
                            </div>
                            <field.Input
                              type="file"
                              accept="image/*"
                              className="absolute inset-0 cursor-pointer opacity-0"
                              onChangeCapture={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => handleFileChange(e, player.name)}
                            />
                          </Label>
                        }
                      />
                      <FieldDescription className="w-full truncate">
                        {fileNames[player.name] || 'No file chosen'}
                      </FieldDescription>
                    </Field>
                  )}
                </form.AppField>
              </FieldGroup>
            </FieldGroup>
          ))}
        </FieldGroup>
      </FieldGroup>

      <FieldGroup className="settings-field-group">
        <FieldLabel className="settings-group-label">
          SET PLAYER NAMES
        </FieldLabel>
        <FieldGroup className="flex-row">
          {playerGroup.map((player) => (
            <form.AppField key={player.name} name={player.name}>
              {(field) => (
                <field.Input
                  label={player.label}
                  placeholder={player.placeholder}
                  className="h-10 w-full"
                />
              )}
            </form.AppField>
          ))}
        </FieldGroup>
      </FieldGroup>

      <FieldGroup className="settings-field-group">
        <FieldLabel className="settings-group-label">
          SET ROUND & BREAK DURATIONS (SECONDS)
        </FieldLabel>
        <FieldGroup className="flex-row">
          {durationGroup.map((duration) => (
            <form.AppField key={duration.name} name={duration.name}>
              {(field) => (
                <field.NumberInput
                  label={duration.label}
                  className="h-10 w-full text-center"
                  min={1}
                  step={5}
                />
              )}
            </form.AppField>
          ))}
        </FieldGroup>
      </FieldGroup>

      <FieldGroup className="settings-field-group">
        <FieldLabel className="settings-group-label">SET MAX HEALTH</FieldLabel>
        <FieldGroup className="flex-row">
          <form.AppField name="maxHealth">
            {(field) => (
              <field.NumberInput
                label="MAX HEALTH"
                className="h-10 w-full text-center"
                min={1}
                step={10}
              />
            )}
          </form.AppField>
        </FieldGroup>
      </FieldGroup>
    </FieldSet>
  );
};
