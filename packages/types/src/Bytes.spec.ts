// Copyright 2017-2019 @polkadot/types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import Bytes from './Bytes';
import StorageData from './StorageData';

describe('Bytes', () => {
  const CODE = new Uint8Array([0x14, 0x3a, 0x63, 0x6f, 0x64, 0x65]);

  describe('construction', () => {
    it('decodes when hex is not length prefixed', () => {
      expect(
        new Bytes('0x3a636f6465').toU8a()
      ).toEqual(CODE);
    });

    it('decodes from Array<number>', () => {
      expect(
        new Bytes([0x3a, 0x63, 0x6f, 0x64, 0x65]).toU8a()
      ).toEqual(CODE);
    });

    it('creates via storagedata (no prefix)', () => {
      expect(
        new Bytes(
          new StorageData('0x3a636f6465')
        ).toU8a()
      ).toEqual(CODE);
    });

    it('creates via storagedata (with length prefix)', () => {
      expect(
        new Bytes(
          new StorageData('0x143a636f6465')
        ).toU8a()
      ).toEqual(CODE);
    });
  });
});
