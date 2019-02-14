import Struct from '../../codec/Struct';
import Text from '../../Text';
import { MetadataName } from './MetadataRegistry';
import Vector from '../../codec/Vector';
import U16 from '../../U16';

export class FunctionArgumentMetadata extends Struct {
  constructor (value?: any) {
    super({
      name: Text,
      type: MetadataName
    }, value);
  }

  /**
   * @description The argument name
   */
  get name (): Text {
    return this.get('name') as Text;
  }

  /**
   * @description The [[Type]]
   */
  get type (): MetadataName {
    return this.get('type') as MetadataName;
  }
}

export class FunctionMetadata extends Struct {
  constructor (value?: any) {
    super({
      id: U16,
      name: Text,
      arguments: Vector.with(FunctionArgumentMetadata),
      documentation: Vector.with(Text)
    }, value);
  }

  /**
   * @description The [[FunctionArgumentMetadata]] for arguments
   */
  get arguments (): Vector<FunctionArgumentMetadata> {
    return this.get('arguments') as Vector<FunctionArgumentMetadata>;
  }

  /**
   * @description The [[Text]] documentation
   */
  get documentation (): Vector<Text> {
    return this.get('documentation') as Vector<Text>;
  }

  /**
   * @description The `[sectionIndex, methodIndex]` call id
   */
  get id (): U16 {
    return this.get('id') as U16;
  }

  /**
   * @description The call name
   */
  get name (): Text {
    return this.get('name') as Text;
  }
}
