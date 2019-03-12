// Copyright 2017-2019 @polkadot/extrinsics authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Extrinsic, Metadata } from '@polkadot/types/index';
import jsonV0 from '@polkadot/types/Metadata/v0/static';
import jsonV2 from '@polkadot/types/Metadata/v2/static';
import { ModulesWithMethods } from '@polkadot/types/primitive/Method';

import fromMetadata from './fromMetadata';

const metadataTest = (version: string, newExtrinsics: ModulesWithMethods) => {
  describe(version, () => {
    it('should throw if an incorrect number of args is supplied', () => {
      expect(() => newExtrinsics.balances.setBalance()).toThrowError(/expects 3 arguments/);
    });

    it('should return a value if the storage function does not expect an argument', () => {
      expect(() => newExtrinsics.balances.setBalance('5C62W7ELLAAfix9LYrcx5smtcffbhvThkM5x7xfMeYXCt72s', 2, 3)).not.toThrow();
    });

    it('should return properly-encoded transactions', () => {
      expect(
        new Extrinsic(newExtrinsics.timestamp.set([10101])).toU8a()
      ).toEqual(
        new Uint8Array([
          // length (encoded)
          4 << 2,
          // version, no signature
          1,
          // index
          0, 0,
          // values, Compact<Moment>
          116
        ])
      );
    });
  });
};

describe('fromMetadata', () => {
    // Use the pre-generated metadata
  const metadata = new Metadata(jsonV0).asV0;
  const newExtrinsics = fromMetadata(metadata);
  metadataTest('v0', newExtrinsics);
  // Use the pre-generated metadata
  const metadataV2 = new Metadata(jsonV2).asV0;
  const newExtrinsicsV2 = fromMetadata(metadataV2);
  metadataTest('v2', newExtrinsicsV2);
});
