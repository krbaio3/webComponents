import { storiesOf } from '@storybook/html';
import notes from './readme.md';

storiesOf('Components', module)
.add('My Component', () => {
  return `<my-component first="Jorge" middle="Carballo" last="Alonso"></my-component>`
}, {notes})


