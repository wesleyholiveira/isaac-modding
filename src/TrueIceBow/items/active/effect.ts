import { TearFlag, TearVariant } from "isaac-typescript-definitions";
import { getPlayerIndex } from "isaacscript-common/dist/src/functions/playerIndex";
import { Calculus } from "../../../helper/Calculus";
import { playerState } from "../../states/playerState";

const GetCosMovementAngle = (coords: string): number => {
  const angle: Record<string, number> = {
    "0.0,-1.0": 270,
    "0.0,1.0": 90,
    "-1.0,0.0": 180,
    "1.0,0.0": 0,
    "0.0,0.0": -1,
  };

  const newAngle = angle[coords];
  if (newAngle === undefined) {
    return -1;
  }

  return newAngle;
};

/**
 * Método responsável por toda lógica de criar as lágrimas em um cone de visão.
 *
 * @param player Parâmetro que contém a entidade do jogador para efetuar os disparos de lágrimas.
 * @param fovAngle Cone de visão do arco (em graus).
 * @param tearsDefault Quantidade de lágrimas congelantes por padrão.
 * @param capIceTears Limite máximo de lágrimas congelantes que podem serem disparas.
 * @param shotSpeed Velocidade a qual as lágrimas congelantes se locomovem ao serem disparadas.
 */
export function trueIceBowEffect(
  player: EntityPlayer,
  fovAngle = 45,
  tearsDefault = 4,
  capIceTears = 12,
  shotSpeed = 15,
): void {
  const tearsFireRate = Calculus.tearDelay2fireRate(player.MaxFireDelay);
  const { X, Y } = player.GetShootingJoystick();
  const { baseMaxFireDelay } = playerState.persistent;
  const currentBaseMaxFireDelay =
    baseMaxFireDelay[getPlayerIndex(player, true)];

  const maxIceTearsFireRate =
    (Calculus.tearDelay2fireRate(currentBaseMaxFireDelay ?? 10.0) *
      capIceTears) /
    tearsDefault;

  const tears = Math.max(
    1,
    Math.min(
      capIceTears,
      Math.ceil((tearsFireRate * capIceTears) / maxIceTearsFireRate),
    ),
  );

  // Isaac.ConsoleOutput(`IceTears: ${tears} / Tears: ${tearsFireRate}\n`);

  const medianAngle = fovAngle / 2;
  const stepAngle = fovAngle / tears;
  const strCoords = `${X},${Y}`;
  const angle = GetCosMovementAngle(strCoords);
  const coords = [angle];

  for (let i = stepAngle; i <= medianAngle; i += stepAngle) {
    const curAngle = angle + i;
    const prevAngle = angle - i;

    coords.push(curAngle);
    coords.push(prevAngle);
  }

  if (tears % 2 === 0) {
    coords.pop();
  }

  for (const newAngle of coords) {
    const newX = shotSpeed * Math.cos(Calculus.deg2rad(newAngle));
    const newY = shotSpeed * Math.sin(Calculus.deg2rad(newAngle));

    const tear = player.FireTear(
      player.Position,
      Vector(newX, newY),
      false,
      false,
      false,
      undefined,
    );

    if (!tear.HasTearFlags(TearFlag.ICE) && tear.Variant !== TearVariant.ICE) {
      tear.AddTearFlags(TearFlag.ICE);
      tear.AddTearFlags(TearFlag.SLOW);
      tear.ChangeVariant(TearVariant.ICE);
    }
  }
}
