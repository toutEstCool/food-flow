/**
 * Telegram Web App API Definitions
 * @see https://core.telegram.org/bots/webapps
 */

interface Window {
    Telegram: {
        WebApp: TelegramWebApp;
    };
}

interface TelegramWebApp {
    initData: string;
    initDataUnsafe: WebAppInitData;
    version: string;
    platform: string;
    colorScheme: 'light' | 'dark';
    themeParams: ThemeParams;
    isExpanded: boolean;
    viewportHeight: number;
    viewportStableHeight: number;
    headerColor: string;
    backgroundColor: string;
    isClosingConfirmationEnabled: boolean;
    isVerticalSwipesEnabled: boolean;
    BackButton: BackButton;
    MainButton: MainButton;
    SecondaryButton: SecondaryButton;
    SettingsButton: SettingsButton;
    HapticFeedback: HapticFeedback;
    CloudStorage: CloudStorage;
    BiometricManager: BiometricManager;

    ready(): void;
    expand(): void;
    close(): void;
    showPopup(params: PopupParams, callback?: (id?: string) => void): void;
    showAlert(message: string, callback?: () => void): void;
    showConfirm(message: string, callback?: (confirmed: boolean) => void): void;
    showScanQrPopup(params: ScanQrPopupParams, callback?: (text: string) => boolean | void): void;
    closeScanQrPopup(): void;
    readTextFromClipboard(callback?: (text: string) => void): void;
    requestWriteAccess(callback?: (allowed: boolean) => void): void;
    requestContact(callback?: (shared: boolean) => void): void;
    enableClosingConfirmation(): void;
    disableClosingConfirmation(): void;
    enableVerticalSwipes(): void;
    disableVerticalSwipes(): void;
    setHeaderColor(color: 'bg_color' | 'secondary_bg_color' | string): void;
    setBackgroundColor(color: 'bg_color' | 'secondary_bg_color' | string): void;
    onEvent(eventType: EventTypes, eventHandler: EventHandler): void;
    offEvent(eventType: EventTypes, eventHandler: EventHandler): void;
    sendData(data: string): void;
    openLink(url: string, options?: { try_instant_view?: boolean }): void;
    openTelegramLink(url: string): void;
    openInvoice(url: string, callback?: (status: InvoiceStatus) => void): void;
    switchInlineQuery(query: string, choose_chat_types?: ('users' | 'bots' | 'groups' | 'channels')[]): void;
    shareToStory(media_url: string, params?: ShareStoryParams): void;
    checkHomeScreenStatus(callback: (status: 'unsupported' | 'unknown' | 'added' | 'missed') => void): void;
    addToHomeScreen(): void;
    requestFullscreen(): void;
    exitFullscreen(): void;
    lockOrientation(): void;
    unlockOrientation(): void;
    downloadFile(params: { url: string; file_name: string }, callback?: (accepted: boolean) => void): void;
}

// Event Types
type EventTypes =
    | 'themeChanged'
    | 'viewportChanged'
    | 'mainButtonClicked'
    | 'secondaryButtonClicked'
    | 'backButtonClicked'
    | 'settingsButtonClicked'
    | 'invoiceClosed'
    | 'popupClosed'
    | 'qrTextReceived'
    | 'scanQrPopupClosed'
    | 'clipboardTextReceived'
    | 'writeAccessRequested'
    | 'contactRequested'
    | 'biometricManagerUpdated'
    | 'biometricAuthRequested'
    | 'biometricTokenUpdated'
    | 'fullscreenFailed'
    | 'homeScreenChecked'
    | 'accelerometerStarted'
    | 'accelerometerStopped'
    | 'accelerometerChanged'
    | 'deviceOrientationStarted'
    | 'deviceOrientationStopped'
    | 'deviceOrientationChanged'
    | 'gyroscopeStarted'
    | 'gyroscopeStopped'
    | 'gyroscopeChanged'
    | 'locationManagerUpdated'
    | 'locationRequested'
    | 'shareMessageSent'
    | 'shareMessageFailed'
    | 'emojiStatusSet'
    | 'emojiStatusFailed'
    | 'emojiStatusAccessRequested'
    | 'fileDownloadStatusUpdated';

type EventHandler = (eventData?: any) => void;

interface ThemeParams {
    bg_color?: string;
    text_color?: string;
    hint_color?: string;
    link_color?: string;
    button_color?: string;
    button_text_color?: string;
    secondary_bg_color?: string;
    header_bg_color?: string;
    accent_text_color?: string;
    section_bg_color?: string;
    section_header_text_color?: string;
    subtitle_text_color?: string;
    destructive_text_color?: string;
    bottom_bar_bg_color?: string;
}

interface WebAppInitData {
    query_id?: string;
    user?: WebAppUser;
    receiver?: WebAppUser;
    chat?: WebAppChat;
    chat_type?: 'sender' | 'private' | 'group' | 'supergroup' | 'channel';
    chat_instance?: string;
    start_param?: string;
    can_send_after?: number;
    auth_date: number;
    hash: string;
    signature?: string;
}

interface WebAppUser {
    id: number;
    is_bot?: boolean;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
    added_to_attachment_menu?: boolean;
    allows_write_to_pm?: boolean;
    photo_url?: string;
}

interface WebAppChat {
    id: number;
    type: 'group' | 'supergroup' | 'channel';
    title: string;
    username?: string;
    photo_url?: string;
}

interface BackButton {
    isVisible: boolean;
    onClick(callback: () => void): BackButton;
    offClick(callback: () => void): BackButton;
    show(): BackButton;
    hide(): BackButton;
}

interface MainButton {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isActive: boolean;
    isProgressVisible: boolean;
    setText(text: string): MainButton;
    onClick(callback: () => void): MainButton;
    offClick(callback: () => void): MainButton;
    show(): MainButton;
    hide(): MainButton;
    enable(): MainButton;
    disable(): MainButton;
    showProgress(leaveActive?: boolean): MainButton;
    hideProgress(): MainButton;
    setParams(params: {
        text?: string;
        color?: string;
        text_color?: string;
        is_active?: boolean;
        is_visible?: boolean;
    }): MainButton;
}

interface SecondaryButton extends MainButton {
    position?: 'top' | 'left' | 'bottom' | 'right';
    setParams(params: {
        text?: string;
        color?: string;
        text_color?: string;
        is_active?: boolean;
        is_visible?: boolean;
        position?: 'top' | 'left' | 'bottom' | 'right';
    }): SecondaryButton;
}

interface SettingsButton {
    isVisible: boolean;
    onClick(callback: () => void): SettingsButton;
    offClick(callback: () => void): SettingsButton;
    show(): SettingsButton;
    hide(): SettingsButton;
}

interface HapticFeedback {
    impactOccurred(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'): HapticFeedback;
    notificationOccurred(type: 'error' | 'success' | 'warning'): HapticFeedback;
    selectionChanged(): HapticFeedback;
}

interface CloudStorage {
    setItem(key: string, value: string, callback?: (error: string | null, stored?: boolean) => void): void;
    getItem(key: string, callback?: (error: string | null, value?: string) => void): void;
    getItems(keys: string[], callback?: (error: string | null, values?: Record<string, string>) => void): void;
    removeItem(key: string, callback?: (error: string | null, deleted?: boolean) => void): void;
    removeItems(keys: string[], callback?: (error: string | null, deleted?: boolean) => void): void;
    getKeys(callback?: (error: string | null, keys?: string[]) => void): void;
}

interface BiometricManager {
    isInited: boolean;
    isBiometricAvailable: boolean;
    biometricType: 'finger' | 'face' | 'unknown';
    isAccessRequested: boolean;
    isAccessGranted: boolean;
    isBiometricTokenSaved: boolean;
    deviceId: string;
    init(callback?: () => void): BiometricManager;
    requestAccess(params: { reason?: string }, callback?: (granted: boolean) => void): BiometricManager;
    authenticate(params: { reason?: string }, callback?: (success: boolean, token?: string) => void): BiometricManager;
    updateBiometricToken(token: string, callback?: (success: boolean) => void): BiometricManager;
    openSettings(): BiometricManager;
}

interface PopupParams {
    title?: string;
    message: string;
    buttons?: PopupButton[];
}

interface PopupButton {
    id?: string;
    type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
    text?: string;
}

interface ScanQrPopupParams {
    text?: string;
}

interface ShareStoryParams {
    text?: string;
    widget_link?: {
        text: string;
        name?: string;
    };
}

type InvoiceStatus = 'paid' | 'cancelled' | 'failed' | 'pending';
