import {ArrowRight2} from 'iconsax-react-native';
import {useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-paper';
import {SelectedItem} from '../../../../../models/SelectedItem';
import {replaceName} from '../../../../../utils/replaceName';
import {appColors} from '../../../../../constants/appColors';
import {strings} from '../../../../../languages/strings';
import LumaSearchBar from './LumaSearchBar';
import {SystemUtils} from '../../../../../utils/system';
import useAppTheme from '../../../../../hooks/useAppTheme';
import LumaButton from './LumaButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import WorkflowImage from '../../../../shortcut/components/WorkflowImage';
import {useSelector} from 'react-redux';
import {companyUrlSelector} from '../../../../../redux/reducers/companyUrlReducer';
import getWorkflowApi from '../../../../../api/workflowapi';
import {langSelector} from '../../../../../redux/reducers/languageReducer';
import LumaUser from './LumaUser';

interface Props {
  items: SelectedItem[];
  label?: string;
  placeholder?: string;
  onSelected: (item: SelectedItem, multi?: string) => void;
  item?: SelectedItem;
  isSearch?: boolean;
  multiItem?: string;
  multi?: boolean;
  marginBottom?: number;
}

const LumaPicker = (props: Props) => {
  const {
    items,
    label,
    placeholder,
    onSelected,
    item,
    isSearch,
    multiItem,
    multi,
    marginBottom = 0,
  } = props;
  const themeColor = useAppTheme();
  const insets = useSafeAreaInsets();
  const modalizeRef = useRef<Modalize>(null);
  const companyUrl = useSelector(companyUrlSelector);
  const lang = useSelector(langSelector);

  const [selectedItem, setSelectedItem] = useState(item);
  const [isVisibleData, setIsVisibleData] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState<SelectedItem[]>([]);
  const [multiSelectedItem, setMultiSelectedItem] = useState<SelectedItem[]>(
    [],
  );
  const [multiPlaceholder, setMultiPlaceholder] = useState('');
  const [companyLogo, setCompanyLogo] = useState('');

  useEffect(() => {
    getCompanyLogo();
  }, []);

  const getCompanyLogo = async () => {
    const url = `/Account/LogoUrl?lang=${lang ?? 'vi'}`;

    const data = await getWorkflowApi.getWorkflowApi(
      companyUrl,
      url,
      undefined,
      'get',
      undefined,
      undefined,
      true,
    );

    setCompanyLogo(data as never);
  };

  useEffect(() => {
    if (isVisibleData) {
      modalizeRef.current?.open();
    } else {
      modalizeRef.current?.close();
    }
  }, [isVisibleData]);

  useEffect(() => {
    if (multi && multiItem) {
      const textList: string[] = [];
      const multiItemFormat = multiItem.split(',');

      multiItemFormat.forEach((id: string) => {
        textList.push(items.filter(i => i.id === id)[0].title);
      });

      setMultiPlaceholder(textList.join(', '));
    } else {
      setMultiPlaceholder('');
    }
  }, [multi, multiItem]);

  useEffect(() => {
    const searchKey = searchValue ? replaceName(searchValue) : '';
    const itemsResult: SelectedItem[] = [];

    items.forEach(item => {
      const titleKey = item.title ? replaceName(item.title) : '';
      if (titleKey.includes(searchKey)) {
        itemsResult.push(item);
      }
    });
    setResults(itemsResult);
  }, [searchValue]);

  useEffect(() => {
    selectedItem && onSelected(selectedItem);

    setIsVisibleData(false);
    setSearchValue('');
  }, [selectedItem]);

  const handleMultiSelected = (item: SelectedItem) => {
    const exist = multiSelectedItem.find(i => i.id === item.id);

    if (exist) {
      setMultiSelectedItem(multiSelectedItem.filter(i => i.id !== item.id));
    } else {
      setMultiSelectedItem([...multiSelectedItem, item]);
    }
  };

  return (
    <View>
      <View style={[{gap: 8, marginBottom: marginBottom}]}>
        {label && (
          <Text style={{color: appColors.text, fontWeight: 500}}>{label}</Text>
        )}

        <TouchableOpacity
          onPress={() => setIsVisibleData(true)}
          style={styles.boxChoose}>
          <Text style={{color: appColors.text}}>
            {multiPlaceholder !== ''
              ? multiPlaceholder
              : item
                ? item.title
                : ''}
          </Text>
          <ArrowRight2 size={18} color={appColors.text2} />
        </TouchableOpacity>
      </View>
      <Portal>
        <Modalize
          panGestureEnabled={false}
          onClose={() => {
            setIsVisibleData(false);
          }}
          ref={modalizeRef}
          adjustToContentHeight
          handlePosition="inside">
          <View
            style={{
              marginTop: 16,
              backgroundColor: appColors.white,
              borderRadius: 20,
              paddingBottom: insets.bottom + 12,
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingHorizontal: 12,
                marginVertical: 12,
                gap: 8,
              }}>
              {multi && (
                <LumaButton
                  color={appColors.f5f5f5}
                  icon={size => (
                    <MaterialIcons
                      name="close"
                      size={size}
                      color={appColors.lumaBlack}
                    />
                  )}
                  onPress={() => {
                    setResults([]);
                    setIsVisibleData(false);
                  }}
                />
              )}
              {isSearch ? (
                <LumaSearchBar
                  flex={1}
                  onChangeText={setSearchValue}
                  backgroundColor={appColors.lumaBackground}
                />
              ) : (
                <View style={{flex: 1}} />
              )}
              {multi ? (
                <LumaButton
                  color={themeColor}
                  border={themeColor}
                  icon={(size, color) => (
                    <MaterialIcons name="check" size={size} color={color} />
                  )}
                  onPress={() => {
                    onSelected(
                      {
                        id: '',
                        title: '',
                      },
                      multiSelectedItem.map(i => i.id).join(','),
                    );
                    setResults([]);
                    setIsVisibleData(false);
                    setMultiSelectedItem([]);
                  }}
                />
              ) : (
                <LumaButton
                  color={appColors.f5f5f5}
                  icon={size => (
                    <MaterialIcons
                      name="close"
                      size={size}
                      color={appColors.lumaBlack}
                    />
                  )}
                  onPress={() => {
                    setResults([]);
                    setIsVisibleData(false);
                  }}
                />
              )}
            </View>

            {results.length > 0 || items.length > 0 ? (
              <FlatList
                removeClippedSubviews={true}
                initialNumToRender={20}
                maxToRenderPerBatch={20}
                windowSize={5}
                getItemLayout={(data, index) => ({
                  length: 50,
                  offset: (50 + 8) * index,
                  index,
                })}
                showsVerticalScrollIndicator={false}
                data={results.length > 0 ? results : items}
                keyExtractor={e => e.id}
                ItemSeparatorComponent={() => <View style={{height: 8}} />}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      key={`item${index}`}
                      style={[
                        styles.listItem,
                        multi &&
                          multiSelectedItem.some(i => i.id === item.id) && {
                            backgroundColor: SystemUtils.addAlpha(
                              themeColor,
                              0.2,
                            ),
                          },
                      ]}
                      onPress={() => {
                        multi
                          ? handleMultiSelected(item)
                          : setSelectedItem(item);
                      }}>
                      {item.imageUrl && (
                        <View style={{marginRight: 8}}>
                          <WorkflowImage
                            imageUri={item.imageUrl}
                            companyLogo={companyLogo}
                          />
                        </View>
                      )}
                      {item.userEmail && (
                        <LumaUser
                          userEmail={item?.userEmail ?? ''}
                          avatarOnly
                          size={24}
                        />
                      )}
                      <Text
                        style={{
                          color:
                            selectedItem && selectedItem.id === item.id
                              ? appColors.blue4
                              : appColors.text,
                          flex: 1,
                        }}
                        numberOfLines={2}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            ) : (
              <View>
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: '10%',
                    color: appColors.gray,
                  }}>
                  {strings.EmptyData}
                </Text>
              </View>
            )}
          </View>
        </Modalize>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 16,
    marginHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  boxChoose: {
    borderWidth: 1,
    borderColor: appColors.gray3,
    backgroundColor: appColors.white,
    borderRadius: 8,
    padding: 8,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default LumaPicker;
