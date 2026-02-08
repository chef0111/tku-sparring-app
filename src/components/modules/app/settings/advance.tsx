// eslint-disable-next-line
// @ts-nocheck

import { useEffect } from 'react';
import { IconReload } from '@tabler/icons-react';
import { PlayerAvatar } from '../hud/player-avatar';
import { advancePlayerGroup } from './constant/form';
import { CommonSettings, DurationFields, MaxHealthField } from './common';
import { useSettings } from '@/contexts/settings';
import { useAppForm } from '@/components/form/hooks';
import { AdvanceSettingsSchema } from '@/lib/validations';
import { FieldGroup, FieldLabel } from '@/components/ui/field';
import { ComboboxItem } from '@/components/ui/combobox';
import { Button } from '@/components/ui/button';

export const AdvanceSettings = () => {
  const { formData, updateAdvanceForm, setFormState } = useSettings();
  const { advance } = formData;

  const form = useAppForm({
    defaultValues: {
      tournament: advance.tournament,
      group: advance.group,
      match: advance.match,
      redPlayerAvatar: undefined as File | undefined,
      bluePlayerAvatar: undefined as File | undefined,
      redPlayerName: advance.redPlayerName,
      bluePlayerName: advance.bluePlayerName,
      roundDuration: advance.roundDuration,
      breakDuration: advance.breakDuration,
      maxHealth: advance.maxHealth,
    },
  });

  useEffect(() => {
    const unsubscribe = form.store.subscribe(() => {
      const state = form.store.state;
      const values = state.values;

      updateAdvanceForm({
        redPlayerName: values.redPlayerName,
        bluePlayerName: values.bluePlayerName,
        roundDuration: values.roundDuration,
        breakDuration: values.breakDuration,
        maxHealth: values.maxHealth,
      });

      const validation = AdvanceSettingsSchema.safeParse(values);
      setFormState({
        isDirty: state.isDirty,
        isValid: validation.success,
      });
    });
    return unsubscribe;
  }, [form.store, updateAdvanceForm, setFormState]);

  const tournaments = [];
  const groups = [];
  const matches = [];

  return (
    <CommonSettings>
      <FieldGroup className="settings-field-group relative items-center">
        <FieldLabel className="settings-group-label text-2xl!">
          TOURNAMENT SETTINGS
        </FieldLabel>
        <Button
          variant="outline"
          size="icon-sm"
          className="absolute top-4 right-4"
        >
          <IconReload />
        </Button>
        <FieldGroup>
          <form.AppField name="tournament">
            {(field) => (
              <field.Combobox
                data={tournaments}
                type="tournaments"
                label="SELECT TOURNAMENT"
              >
                {tournaments.map((tournament) => (
                  <ComboboxItem
                    key={tournament.value}
                    value={tournament.value}
                    className="hover:bg-accent! bg-transparent!"
                  >
                    {tournament.label}
                  </ComboboxItem>
                ))}
              </field.Combobox>
            )}
          </form.AppField>
        </FieldGroup>

        <FieldGroup>
          <form.AppField name="group">
            {(field) => (
              <field.Combobox data={groups} type="groups" label="SELECT GROUP">
                {groups.map((group) => (
                  <ComboboxItem
                    key={group.value}
                    value={group.value}
                    className="hover:bg-accent! bg-transparent!"
                  >
                    {group.label}
                  </ComboboxItem>
                ))}
              </field.Combobox>
            )}
          </form.AppField>
        </FieldGroup>

        <FieldGroup>
          <form.AppField name="match">
            {(field) => (
              <field.Combobox
                data={matches}
                type="matches"
                label="SELECT MATCH"
              >
                {matches.map((match) => (
                  <ComboboxItem
                    key={match.value}
                    value={match.value}
                    className="hover:bg-accent! bg-transparent!"
                  >
                    {match.label}
                  </ComboboxItem>
                ))}
              </field.Combobox>
            )}
          </form.AppField>
        </FieldGroup>
      </FieldGroup>

      <FieldGroup className="settings-field-group">
        <FieldLabel className="settings-group-label">
          ATHELETES INFORMATIONS
        </FieldLabel>
        <FieldGroup className="flex-row">
          {advancePlayerGroup.map((player) => (
            <FieldGroup key={player.nameAvatar} className="avatar-group">
              <FieldGroup className="flex-row items-center">
                <PlayerAvatar
                  name={player.playerName}
                  image={advance[player.nameAvatar] || ''}
                  className={player.className}
                  fallback={
                    <img src={player.fallback} alt={player.playerName} />
                  }
                />
                <form.AppField key={player.namePlayer} name={player.namePlayer}>
                  {(field) => (
                    <field.Input
                      label={player.label}
                      defaultValue={player.playerName}
                      className="h-10 w-full truncate"
                      tooltip={player.playerName}
                      disabled
                      tooltipSide="bottom"
                    />
                  )}
                </form.AppField>
              </FieldGroup>
            </FieldGroup>
          ))}
        </FieldGroup>
      </FieldGroup>

      <DurationFields form={form} className="items-center" />
      <MaxHealthField form={form} className="items-center" />
    </CommonSettings>
  );
};
