import React, {
  FC,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  useWindowDimensions,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  LayoutChangeEvent,
  ScrollView,
  Dimensions,
} from 'react-native';
import RenderHtml, {
  CustomBlockRenderer,
  MixedStyleDeclaration,
  RenderHTMLProps,
  TNodeChildrenRenderer,
} from 'react-native-render-html';
import {strings} from '../../../../../../languages/strings';
import useAppTheme from '../../../../../../hooks/useAppTheme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {appColors} from '../../../../../../constants/appColors';
import {WorkThreadAttachModel} from '../../../../../../models/chat/thread/workThreadAttachModel';
import {handleOpenFileOfChatThread} from '../../../../../../utils/handleOpenFile';
import {
  NavigationContainerRefContext,
  NavigationContext,
  useFocusEffect,
} from '@react-navigation/native';
import {DynamicModel} from '../../../../../../models/DynamicModel';
import {CommunityCompanyUtils} from '../../../../../../utils/company/CommunityCompanyUtils';
import {useSelector} from 'react-redux';
import {companyUrlSelector} from '../../../../../../redux/reducers/companyUrlReducer';
import {loginDataSelector} from '../../../../../../redux/reducers/loginDataReducer';
import AttachedFile from './components/AttachedFile';
import {UrlViewUtils} from '../../../../../../utils/urlViewer/urlViewerUtils';
import {ModalLoading} from '../../../../../../modals/ModalLoading';
import WorkDetail from './components/WorkDetail';

interface Props {
  html: string;
  textColor: string;
  aTagColor: string;
  isItalic?: boolean;
  collapse?: boolean;
  collapsedHeight?: number;
  fontSize?: number;
  style?: any;
  textAlign?: 'left' | 'center' | 'right';
  openUrl?: boolean;
  onOpenUrl?: (url: string) => void;
  openUrlPosition?: 'flex-start' | 'center' | 'flex-end';
  fullExpand?: boolean;
  lineHeight?: number;
  onExpanded?: () => void;
  attachment?: WorkThreadAttachModel[];
  thread?: boolean;
}

const LumaHTMLReader: FC<Props> = memo((props: Props) => {
  const {
    html,
    textColor,
    aTagColor,
    isItalic,
    collapse = false,
    collapsedHeight = Platform.OS === 'ios' ? 18 : 19.3,
    fontSize = 14,
    style,
    textAlign = 'left',
    openUrl = false,
    onOpenUrl,
    openUrlPosition = 'flex-start',
    fullExpand = false,
    onExpanded,
    attachment,
    thread = false,
  } = props;
  const themeColor = useAppTheme();
  const {width: contentWidth, height: screenHeight} = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const navigationContext = React.useContext(NavigationContext);
  const rootNavigation = React.useContext(NavigationContainerRefContext);
  const navigation: any = navigationContext ?? rootNavigation;
  const companyUrl = useSelector(companyUrlSelector);
  const loginData = useSelector(loginDataSelector);

  const [expanded, setExpanded] = useState(!collapse);
  const [showButton, setShowButton] = useState(false);
  const [hasMeasured, setHasMeasured] = useState(false);
  const [workUrl, setWorkUrl] = useState<string>('');
  const [origin, setOrigin] = useState<string>(html);
  const [realHtmlHeight, setRealHtmlHeight] = useState(0);
  const [attachmentIds, setAttachmentIds] = useState<string[]>([]);
  const [listAttachment, setListAttachment] = useState<WorkThreadAttachModel[]>(
    [],
  );
  const [loadingFileId, setLoadingFileId] = useState<number | string | null>(
    null,
  );
  const [workflowIds, setWorkflowIds] = useState<DynamicModel[]>([]);
  const [workIds, setWorkIds] = useState<DynamicModel[]>([]);
  const [calendarLoading, setCalendarLoading] = useState(false);

  const MAX_LIMIT_HEIGHT = useMemo(() => screenHeight * 0.4, [screenHeight]);

  const tagStyles = useMemo(() => {
    const tagStylesT: Readonly<Record<string, MixedStyleDeclaration>> = {
      body: {
        color: textColor,
        fontStyle: isItalic ? 'italic' : 'normal',
        fontSize: fontSize,
        textAlign: textAlign,
      },
      p: {
        margin: 0,
        padding: 0,
        color: textColor,
        fontSize: fontSize,
        textAlign: textAlign,
      },
      a: {
        textDecorationLine: 'underline',
        color: aTagColor,
        fontSize: fontSize,
      },
      table: {
        width: '100%',
        marginBottom: 8,
        borderWidth: 0.5,
        borderColor: '#ccc',
      },
      tr: {
        flexDirection: 'row',
      },
      td: {
        width: 130,
        paddingHorizontal: 4,
        borderWidth: 0.5,
        borderColor: '#ccc',
        minHeight: 30,
      },
      th: {
        minHeight: 30,
        width: 130,
        fontWeight: 'bold',
        paddingHorizontal: 4,
        borderWidth: 0.5,
        borderColor: '#ccc',
      },
      h1: {
        fontSize: fontSize + 6,
        fontWeight: 'bold',
        color: textColor,
      },
      h2: {
        fontSize: fontSize + 3,
        fontWeight: 'bold',
        color: textColor,
      },
      h3: {
        fontSize: fontSize,
        fontWeight: 'bold',
        color: textColor,
      },
      strong: {
        fontWeight: 'bold',
        color: textColor,
      },
      b: {
        fontWeight: 'bold',
        color: textColor,
      },
    };
    return tagStylesT;
  }, [textColor, aTagColor, isItalic, fontSize, textAlign]);

  const classesStyles = useMemo(() => {
    const classesStylesT: Readonly<Record<string, MixedStyleDeclaration>> = {
      'message-sender': {
        fontWeight: '600',
        color: appColors.threadText,
      },
      'task-name': {
        fontWeight: '600',
        color: appColors.threadText,
      },
      'mentioned-item': {
        fontWeight: '600',
        color: themeColor,
      },
      mention: {
        fontWeight: '600',
        color: themeColor,
      },
    };
    return classesStylesT;
  }, []);

  const handleContainerLayout = (event: LayoutChangeEvent) => {
    if (hasMeasured) return;

    const {height} = event.nativeEvent.layout;
    setRealHtmlHeight(height);

    if (collapse && height > collapsedHeight) {
      setShowButton(true);
    }
    setHasMeasured(true);
  };

  useEffect(() => {
    let finalHtml = html;

    if (
      finalHtml.includes('class="mention"') ||
      finalHtml.includes("class='mention'")
    ) {
      finalHtml = finalHtml.replace(
        /<a([^>]*\bclass=["'][^"']*mention[^"']*["'][^>]*)>([\s\S]*?)<\/a>/gi,
        '<span$1 class="mention">$2</span>',
      );
    }

    finalHtml = finalHtml.replace(/[\uFFFC\u200B]/g, '');

    finalHtml = finalHtml.replace(
      /<p>\s*(https?:\/\/[^\s<]+)\s*<\/p>/gi,
      '<p><a href="$1" target="_blank" rel="noopener noreferrer">$1</a></p>',
    );

    if (openUrl && html.includes('(chat://work/')) {
      const urlString = html.split('(chat://work/');
      finalHtml = urlString[0];
      if (urlString.length > 1) {
        const usWString2 = urlString[1].split(')')?.[0];
        setWorkUrl(usWString2);
      }

      setOrigin('');
      return;
    }

    finalHtml = finalHtml.replace(
      /'([^']*)'/g,
      "<span class='task-name'>'$1'</span>",
    );

    const extractedAttachmentIds: string[] = [];
    const attachmentRegex =
      /<span[^>]*class=["'][^"']*attachment-file[^"']*["'][^>]*data-id=["']([^"']+)["'][^>]*>[\s\S]*?<\/span>/gi;

    let match;
    while ((match = attachmentRegex.exec(finalHtml)) !== null) {
      if (match[1]) {
        extractedAttachmentIds.push(match[1]);
      }
    }
    setAttachmentIds(extractedAttachmentIds);

    const extractedWorkflows: DynamicModel[] = [];
    const workflowRegex =
      /<span[^>]*class=["'][^"']*related-workflow\b[^"']*["'][^>]*data-id=["']([^"']+)["'][^>]*>([\s\S]*?)<\/span>/gi;

    while ((match = workflowRegex.exec(finalHtml)) !== null) {
      if (match[1] && match[2]) {
        extractedWorkflows.push({
          value: match[1],
          name: match[2].trim(),
        });
      }
    }
    setWorkflowIds(extractedWorkflows);

    const extractedWorkIds: DynamicModel[] = [];
    const workRegex =
      /<span[^>]*class=["'][^"']*related-work\b[^"']*["'][^>]*data-id=["']([^"']+)["'][^>]*>([\s\S]*?)<\/span>/gi;

    while ((match = workRegex.exec(finalHtml)) !== null) {
      if (match[1] && match[2]) {
        extractedWorkIds.push({
          value: match[1],
          name: match[2].trim(),
        });
      }
    }
    setWorkIds(extractedWorkIds);

    finalHtml = finalHtml.replace(
      /<span[^>]*class=["'][^"']*attachment-file[^"']*["'][^>]*>[\s\S]*?<\/span>(\s*,\s*)?/gi,
      '',
    );

    finalHtml = finalHtml.replace(
      /<span[^>]*class=["'][^"']*related-workflow[^"']*["'][^>]*>[\s\S]*?<\/span>(\s*,\s*)?/gi,
      '',
    );

    finalHtml = finalHtml.replace(
      /<span[^>]*class=["'][^"']*related-work[^"']*["'][^>]*>[\s\S]*?<\/span>(\s*,\s*)?/gi,
      '',
    );

    finalHtml = finalHtml.replace(/,\s*$/gi, '').trim();

    setOrigin(finalHtml);
  }, [openUrl, html]);

  const isOverMaxLimit = realHtmlHeight > MAX_LIMIT_HEIGHT;

  const renderers = useMemo(() => {
    return {
      table: (props => {
        return (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TNodeChildrenRenderer tnode={props.tnode} />
          </ScrollView>
        );
      }) as CustomBlockRenderer,
    };
  }, []);

  const renderersProps: RenderHTMLProps['renderersProps'] = useMemo(
    () => ({
      a: {
        onPress: (_event, href) => {
          UrlViewUtils.handleLinkClick(
            href,
            navigation,
            companyUrl,
            (status: boolean) => {
              setCalendarLoading(status);
            },
          );
        },
      },
    }),
    [onOpenUrl],
  );

  useEffect(() => {
    if (attachmentIds?.length > 0 && attachment && attachment.length > 0) {
      const newAttach = attachment.filter(file =>
        attachmentIds.includes(file.id.toString()),
      );

      setListAttachment(newAttach);
    }
  }, [attachmentIds, attachment]);

  const handlePressLinking = (id: number, from: 'work' | 'workflow') => {
    const apiName = from === 'work' ? 'URL_WORK' : 'URL_WORKFLOW';

    const chatApi = CommunityCompanyUtils.getUrlWithTarget(companyUrl, apiName);

    if (from === 'work') {
      navigation.push('ChatDetail', {
        chatItem: null,
        workId: Number(id),
        type: 0,
        atTreeView: false,
      });
    } else {
      const url = `${chatApi?.linkAPI}/mobile/workflow/myworkflow/detail/${id}`;
      const processedUrl = `${loginData.loginUrl}?ReturnUrl=${encodeURIComponent(url)}&SecurityString=${loginData.loginString}`;

      navigation.navigate('ChatLinkingScreen', {url: processedUrl});
    }
  };

  const onOpenWorkUrl = () => {
    if (workUrl) {
      UrlViewUtils.handleLinkClick(
        workUrl,
        navigation,
        companyUrl,
        (status: boolean) => {
          setCalendarLoading(status);
        },
      );
    }
  };

  return (
    <View style={[styles.container]}>
      <View
        onLayout={handleContainerLayout}
        style={[
          !hasMeasured &&
            collapse && {
              position: 'absolute',
              opacity: 0,
              width: '100%',
            },
          collapse &&
            !expanded &&
            hasMeasured && {
              maxHeight: collapsedHeight,
              overflow: 'hidden',
            },
          fullExpand &&
            collapse &&
            expanded &&
            hasMeasured && {
              height: isOverMaxLimit
                ? Dimensions.get('window').height *
                    (Platform.OS === 'android' ? 0.8 : 0.8) -
                  insets.bottom
                : undefined,
            },
          style,
        ]}>
        <View>
          {fullExpand &&
          collapse &&
          expanded &&
          hasMeasured &&
          isOverMaxLimit ? (
            <ScrollView style={{flex: 1}} nestedScrollEnabled={true}>
              <RenderHtml
                contentWidth={contentWidth}
                source={{html: origin}}
                tagsStyles={tagStyles}
                renderers={renderers}
                classesStyles={classesStyles}
                renderersProps={renderersProps}
                defaultTextProps={{allowFontScaling: false}}
              />
            </ScrollView>
          ) : (
            <RenderHtml
              contentWidth={contentWidth}
              source={{html: origin}}
              tagsStyles={tagStyles}
              renderers={renderers}
              classesStyles={classesStyles}
              renderersProps={renderersProps}
              defaultTextProps={{allowFontScaling: false}}
            />
          )}
        </View>

        {listAttachment.length > 0 && (
          <AttachedFile
            listAttachment={listAttachment}
            loadingFileId={loadingFileId}
            thread={thread}
            onPress={file =>
              handleOpenFileOfChatThread(file, navigation, isLoading => {
                if (isLoading) {
                  setLoadingFileId(file.id);
                } else {
                  setLoadingFileId(null);
                }
              })
            }
          />
        )}

        {workflowIds.length > 0 && (
          <View
            style={[
              {
                marginTop: 4,
                justifyContent: 'center',
                flex: 1,
              },
              !thread && {
                alignItems: 'center',
              },
            ]}>
            {workflowIds.map((workflow, index) => {
              return (
                <TouchableOpacity
                  key={workflow.value}
                  onPress={() => {
                    handlePressLinking(workflow.value, 'workflow');
                  }}
                  style={[
                    {
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 4,
                      paddingBottom: index !== workflowIds.length - 1 ? 4 : 0,
                    },
                    !thread && {
                      justifyContent: 'center',
                    },
                  ]}>
                  <Text
                    style={{color: themeColor, fontWeight: 600, fontSize: 12}}
                    allowFontScaling={false}>
                    {workflow.name +
                      (index !== workflowIds.length - 1 ? ', ' : '')}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {workIds.length > 0 && (
          <View
            style={[
              {
                marginTop: 4,
                justifyContent: 'center',
                flex: 1,
              },
              !thread && {
                alignItems: 'center',
              },
            ]}>
            {workIds.map((work, index) => {
              return (
                <TouchableOpacity
                  key={work.value}
                  onPress={() => {
                    handlePressLinking(work.value, 'work');
                  }}
                  style={[
                    {
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 4,
                      paddingBottom: index !== workIds.length - 1 ? 4 : 0,
                    },
                    !thread && {
                      justifyContent: 'center',
                    },
                  ]}>
                  <Text
                    style={{color: themeColor, fontWeight: 600, fontSize: 12}}
                    allowFontScaling={false}>
                    {work.name + (index !== workIds.length - 1 ? ', ' : '')}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {workUrl && (
          <WorkDetail workUrl={workUrl} onOpenWorkUrl={onOpenWorkUrl} />
        )}
      </View>

      {!hasMeasured && collapse && <View style={{height: collapsedHeight}} />}

      {collapse && showButton && hasMeasured && (
        <TouchableOpacity
          onPress={onExpanded ? onExpanded : () => setExpanded(!expanded)}
          style={styles.btn}
          activeOpacity={0.7}>
          <Text
            style={[styles.seeMore, {color: themeColor}]}
            allowFontScaling={false}>
            {expanded ? strings.showLess : strings.showMore}
          </Text>
        </TouchableOpacity>
      )}
      <ModalLoading visible={calendarLoading} mess={strings.CheckingStatus} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    gap: 8,
  },
  seeMore: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: Platform.OS === 'ios' ? 2 : 0,
  },
  btn: {
    paddingVertical: 4,
  },
});

export default memo(LumaHTMLReader);
