// import type { ElementType, FC } from 'react';

// const MaterialIcons = require('react-native-vector-icons/MaterialIcons')
//   .default as ElementType;
// const MaterialCommunityIcons =
//   require('react-native-vector-icons/MaterialCommunityIcons')
//     .default as ElementType;
// const FontAwesome = require('react-native-vector-icons/FontAwesome')
//   .default as ElementType;
// const AntDesign = require('react-native-vector-icons/AntDesign')
//   .default as ElementType;
// const Foundation = require('react-native-vector-icons/Foundation')
//   .default as ElementType;

// type IconType =
//   | 'MaterialIcons'
//   | 'MaterialCommunityIcons'
//   | 'FontAwesome'
//   | 'AntDesign'
//   | 'Foundation';

// interface Props {
//   iconName: IconType;
//   name: string;
//   size: number;
//   color: string;
//   style?: any;
// }

// const iconMap = {
//   MaterialIcons,
//   MaterialCommunityIcons,
//   FontAwesome,
//   AntDesign,
//   Foundation,
// };

// const VectorIcon: FC<Props> = (props) => {
//   const { iconName, name, size, color, style = {} } = props;
//   const Icon = iconMap[iconName];

//   if (!Icon) {
//     return null;
//   }

//   return <Icon name={name} size={size} color={color} style={style} />;
// };

// export default VectorIcon;
