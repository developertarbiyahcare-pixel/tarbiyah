// services/trackingService.ts

const METRICS_STORAGE_KEY = 'tarbiyahEngagementMetrics';

interface PageView {
    path: string;
    startTime: number; // timestamp
    duration: number; // in seconds
}

interface UserEvent {
    name: string;
    timestamp: number;
    details: Record<string, any>;
}

interface Session {
    sessionId: string;
    startTime: number;
    endTime: number | null;
    duration: number; // in seconds
    events: UserEvent[];
    pageViews: PageView[];
}

interface EngagementMetrics {
    sessions: Session[];
}

let currentSessionId: string | null = null;
let currentPageView: { path: string; startTime: number } | null = null;

const getMetrics = (): EngagementMetrics => {
    try {
        const data = localStorage.getItem(METRICS_STORAGE_KEY);
        return data ? JSON.parse(data) : { sessions: [] };
    } catch (e) {
        console.error("Failed to parse engagement metrics:", e);
        return { sessions: [] };
    }
};

const saveMetrics = (metrics: EngagementMetrics) => {
    try {
        localStorage.setItem(METRICS_STORAGE_KEY, JSON.stringify(metrics));
    } catch (e) {
        console.error("Failed to save engagement metrics:", e);
    }
};

const getOrCreateSession = (): Session => {
    const metrics = getMetrics();
    if (!currentSessionId) {
        currentSessionId = `session_${Date.now()}`;
    }

    let session = metrics.sessions.find(s => s.sessionId === currentSessionId);
    if (!session) {
        session = {
            sessionId: currentSessionId,
            startTime: Date.now(),
            endTime: null,
            duration: 0,
            events: [],
            pageViews: [],
        };
        metrics.sessions.push(session);
        saveMetrics(metrics);
    }
    return session;
};

export const startSession = () => {
    getOrCreateSession();
    // Handle session end on page visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
            endSession();
        }
    });
    // Also handle it on unload
     window.addEventListener('beforeunload', endSession);
};

export const endSession = () => {
    if (!currentSessionId) return;

    const metrics = getMetrics();
    const sessionIndex = metrics.sessions.findIndex(s => s.sessionId === currentSessionId);

    if (sessionIndex > -1) {
        const session = metrics.sessions[sessionIndex];
        if (session.endTime === null) { // Only end it once
            session.endTime = Date.now();
            session.duration = Math.round((session.endTime - session.startTime) / 1000);
            
            // End the last page view as well
            if (currentPageView) {
                const now = Date.now();
                const duration = Math.round((now - currentPageView.startTime) / 1000);
                session.pageViews.push({ ...currentPageView, duration });
                currentPageView = null;
            }

            metrics.sessions[sessionIndex] = session;
            saveMetrics(metrics);
        }
    }
};

export const trackPageView = (path: string) => {
    const metrics = getMetrics();
    const session = metrics.sessions.find(s => s.sessionId === currentSessionId);
    if (!session) return; // No active session

    const now = Date.now();
    
    // Finalize the previous page view
    if (currentPageView && currentPageView.path !== path) {
        const duration = Math.round((now - currentPageView.startTime) / 1000);
        session.pageViews.push({ ...currentPageView, duration });
    }
    
    // Start the new page view
    currentPageView = { path, startTime: now };
    
    // Update session and save
    const sessionIndex = metrics.sessions.findIndex(s => s.sessionId === currentSessionId);
    if (sessionIndex > -1) {
        metrics.sessions[sessionIndex] = session;
        saveMetrics(metrics);
    }
};

export const trackEvent = (name: string, details: Record<string, any> = {}) => {
    const metrics = getMetrics();
    const session = metrics.sessions.find(s => s.sessionId === currentSessionId);
    if (!session) return; // No active session
    
    session.events.push({
        name,
        timestamp: Date.now(),
        details,
    });
    
    // Update session and save
    const sessionIndex = metrics.sessions.findIndex(s => s.sessionId === currentSessionId);
    if (sessionIndex > -1) {
        metrics.sessions[sessionIndex] = session;
        saveMetrics(metrics);
    }
};
