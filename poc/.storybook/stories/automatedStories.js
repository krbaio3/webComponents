import Case from 'case';

/**
 * Given a property (from stencil Component.properties) and an optional
 * controlOptions object generates a control which can be used to
 * dynamically update the properties of the component.
 */
function getControlForProp(prop, controlOptions) {
  let defaultVal = '';
  let control = {
    defaultValue: defaultVal,
    control: { type: 'text' },
  };

  // control options have to be defined using camelCase
  const propCamel = Case.camel(prop.attribute);
  const argsOption = controlOptions.args[propCamel] || controlOptions.args[prop.attribute];
  const argTypesOptions = controlOptions.argTypes[propCamel] || controlOptions.argTypes[prop.attribute];

  // if control options are defined, use those
  if (argTypesOptions) {
    control = argTypesOptions;
  }
  // otherwise, implicitly create controls based on prop type or attribute name
  else if (/^(?:number|boolean|object)$/i.test(prop.type)) {
    control = { control: { type: prop.type.toLowerCase() } };
  } else if (/^(?:string)$/i.test(prop.type)) {
    if (!/^(?:string|number|boolean|object)$/i.test(prop.complexType.original)) {
      const arrOptions = prop.complexType.original.split(' | ');
      const selectOptions = arrOptions.map(o => (o.match(/('(\w|-)+')/g) ? o.replace(/'|\|/gi, '').trim() : o));

      control = {
        control: {
          type: 'select',
          options: selectOptions,
        },
      };
    }
  } else if (prop.attribute.indexOf('date') !== -1) {
    control = {
      control: {
        type: 'date',
      },
    };
    defaultVal = new Date();
  }

  if (argsOption) {
    defaultVal = argsOption;
  } else if (prop.defaultValue) {
    try {
      defaultVal = prop.defaultValue;

      if (typeof defaultVal === 'string') {
        defaultVal =
          /('\w+')/g.test(defaultVal) || /('')/g.test(defaultVal) ? (/('')/g.test(defaultVal) ? 'Example Label' : defaultVal.replace(/'/gi, '')) : JSON.parse(defaultVal);
      }
    } catch (e) {
      defaultVal = typeof prop.defaultValue === 'string' ? prop.defaultValue : undefined;
    }
  }

  return { default: defaultVal, control: { ...control, defaultValue: defaultVal } };
}

/**
 * Given a stencil Component and control options, returns an dictionary of
 * all the properties and default values.
 */
function getPropsWithControlValues(Component, controlOptions) {
  let controls = { args: {}, argTypes: {} };
  Object.keys(Component.properties || {}).forEach(key => {
    const property = Component.properties[key];

    // normalize older "attr" into newer "attribute" property
    if (property.hasOwnProperty('attr')) {
      property.attribute = property.attr;
    }

    if (property.hasOwnProperty('attribute')) {
      const control = getControlForProp(property, controlOptions);
      controls = {
        args: { ...controls.args, [key]: control.default },
        argTypes: { ...controls.argTypes, [key]: control.control },
      };
    }
  });

  return controls;
}
