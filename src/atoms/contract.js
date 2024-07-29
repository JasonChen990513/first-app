import { atomWithStorage } from 'jotai/utils';

export const accountAtom = atomWithStorage('walletAddress','');
export const contractAtom = atomWithStorage('contractInstance','');
