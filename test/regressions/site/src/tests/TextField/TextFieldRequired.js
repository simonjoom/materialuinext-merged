// @flow weak

import React from 'react';
import TextField, { TextFieldInput, TextFieldLabel } from 'material-ui/TextField';

export default function TextFieldRequired() {
  return (
    <div>
      <TextField required>
        <TextFieldLabel>Foo</TextFieldLabel>
        <TextFieldInput />
      </TextField>
      <TextField required>
        <TextFieldLabel>Foo</TextFieldLabel>
        <TextFieldInput value="Hello world" />
      </TextField>
      <div style={{ position: 'relative', height: 50 }}>
        <TextFieldLabel required shrink focused>Foo</TextFieldLabel>
      </div>
    </div>
  );
}
