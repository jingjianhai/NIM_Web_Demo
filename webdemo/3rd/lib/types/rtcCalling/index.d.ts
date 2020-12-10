import EventEmitter from 'eventemitter3';
import { SetupParams, LoginParams, EventCode, CallType, Callback, RoomInfo, Devices, DeviceType, RTCOptions } from '../types/common';
import { RTCCalling as RTCCallingTypes } from '../types/rtcCalling';
declare class RTCCalling extends EventEmitter implements RTCCallingTypes {
    static version: string;
    private log;
    private debug;
    private localStream;
    private remoteStreams;
    private localView;
    private remoteViews;
    private client;
    private signal;
    private isConnect;
    private channelInfo;
    private callingUserIds;
    private requestId;
    private callType;
    private appKey;
    private uid;
    private invitorChannelInfo;
    private isGroupCall;
    private callStatus;
    private durations;
    private userMap;
    private microphoneId;
    private cameraId;
    private speakerId;
    private audioEnabled;
    private videoEnabled;
    private callTimeout;
    private rejectTimeout;
    private getTokenFunc;
    constructor({ debug }?: RTCOptions);
    /**
     * 初始化G2，需要在login之前调用
     * @param params
     */
    setupAppKey({ appKey }: SetupParams): void;
    /**
     * 登录IM，所有功能先进行登录才能使用
     * @param params
     */
    login(params: LoginParams): Promise<void>;
    /**
     * 登出IM
     * @param params
     */
    logout(params?: Callback): Promise<void>;
    /**
     * 单人呼叫
     * @param params
     */
    call(params: {
        userId: string;
        type: CallType;
    } & Callback): Promise<void>;
    /**
     * 多人呼叫
     * @param params
     */
    groupCall(params: {
        userIds: string[];
        type: CallType;
        groupId?: string;
    } & Callback): Promise<void>;
    /**
     * 注册代理
     * @param eventCode
     * @param callback
     */
    addDelegate(eventCode: EventCode, callback: (...args: any) => void): void;
    /**
     * 移除代理
     * @param eventCode
     */
    removeDelegate(eventCode: EventCode): void;
    /**
     * 1对1取消呼叫
     * @param params
     */
    cancel(params?: Callback): Promise<void>;
    /**
     * 接受呼叫
     * @param params
     */
    accept(params?: Callback): Promise<void>;
    /**
     * 拒绝呼叫
     * @param params
     */
    reject(params?: Callback): Promise<void>;
    /**
     * 离开，不影响通话中的其他人
     * @param params
     */
    leave(params?: Callback): Promise<void>;
    /**
     * 挂断，同时挂断其他人
     * @param params
     */
    hangup(params?: Callback): Promise<void>;
    /**
     * 设置获取token的异步函数，在加入RTC之前调用
     * @param cb 获取token的异步函数
     */
    setTokenService(cb: (uid: string) => Promise<string>): void;
    /**
     * 设置呼叫超时时间，在呼叫前调用
     * @param t 超时时间，单位ms
     */
    setCallTimeout(t: number): void;
    /**
     * 设置自己画面，在播放之前调用
     * @param view 位于的DOM节点
     */
    setupLocalView(view?: HTMLElement): void;
    /**
     * 设置其他用户画面，在播放之前调用
     * @param userId IM SDK的account
     * @param view 位于的DOM节点
     */
    setupRemoteView(userId: string, view?: HTMLElement): void;
    /**
     * 开启/关闭摄像头
     * @param enabled true 打开 false 关闭
     */
    enableLocalVideo(enabled: boolean): Promise<void>;
    /**
     * 开启/关闭麦克风
     * @param mute true 关闭 false 开启
     */
    muteLocalAudio(mute: boolean): Promise<void>;
    /**
     * 选择扬声器
     * @param deviceId 设备id
     */
    selectSpeakers(deviceId: string): Promise<void>;
    /**
     * 获取设备列表
     */
    getDevices(): Promise<Devices>;
    /**
     * 切换设备
     * @param type 设备类型
     * @param deviceId 设备id
     */
    switchDevice(type: DeviceType, deviceId: string): Promise<void>;
    /**
     * 切换通话类型
     * @param type CallType
     */
    switchCallType(type: CallType): Promise<void>;
    /**
     * 取消订阅远端音频流
     * @param mute true 关闭 false 开启
     * @param userId account
     */
    setAudioMute(mute: boolean, userId: string): Promise<void>;
    /**
     * 获取房间信息
     */
    getRoomInfo(): Promise<RoomInfo>;
    /**
     * 获取sdk实例
     */
    getSdkInstance(): any;
    /**
     * 创建信令
     */
    private signalCreate;
    /**
     * 单邀
     */
    private signalInvite;
    /**
     * 群邀
     */
    private signalGroupInvite;
    /**
     * 取消呼叫中的信令
     */
    private signalCancel;
    /**
     * 离开信令房间
     */
    private signalLeave;
    /**
     * 退出信令
     */
    private signalClose;
    /**
     * 本端加入信令和G2
     */
    private joinSignalAndRTC;
    /**
     * 接受信令邀请
     * 如果是多人通话，需要加入RTC房间
     */
    private acceptSignal;
    /**
     * 订阅G2流
     * @param stream
     */
    private rtcSubscribe;
    private rtcUnSubscribe;
    /**
     * 离开G2房间
     */
    private rTCLeave;
    /**
     * 本端加入G2的房间
     * 创建本地流并初始化本地流
     * 发布本地流
     */
    private joinRTCChannel;
    /**
     * 初始化本地流
     * @param type
     */
    private initLocalStream;
    private startStreamPreview;
    /**
     * 拒绝通话
     * @param isBusy
     */
    private rejectCall;
    /**
     * 更新通话中的用户数
     * @param members
     */
    private filterCallingUserByMembers;
    /**
     * 单人通话下，需要通知服务端退出的情况
     * @param status
     */
    private sendMessage;
    /**
     * 开启/关闭摄像头
     * @param enabled true 打开 false 关闭
     * @param deviceId [可选] 设备id
     */
    private _enableLocalVideo;
    /**
     * 开启/关闭麦克风
     * @param mute true 关闭 false 开启
     * @param deviceId [可选] 设备id
     */
    private _muteLocalAudio;
    private _selectSpeakers;
    private resetChannel;
    private destroy;
    /**
     * 注册信令和G2的事件监听
     */
    private addEventListener;
    private signalRoomJoinHandler;
    private roomCloseHandler;
    private roomJoinHandler;
    private acceptHandler;
    private inviteHandler;
    private cancelInviteHandler;
    private rejectHandler;
    private controlHandler;
    private leaveHandler;
}
export default RTCCalling;
