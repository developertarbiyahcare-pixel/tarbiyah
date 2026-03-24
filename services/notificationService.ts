/**
 * Shows a notification to the user.
 * This function should be called from the main thread.
 * It leverages the active service worker to display the notification.
 * @param title The title of the notification.
 * @param options The notification options (body, icon, etc.).
 */
export const showNotification = (title: string, options: NotificationOptions): void => {
  // Check if the browser supports notifications and service workers
  if (!('serviceWorker' in navigator)) {
    console.error('Service Worker not supported.');
    return;
  }
  if (!('Notification' in window)) {
    console.error('Notifications not supported.');
    return;
  }

  // Check if permission has been granted
  if (Notification.permission === 'granted') {
    navigator.serviceWorker.ready.then(registration => {
      registration.showNotification(title, options);
    });
  } else {
    console.warn(`Notification permission is ${Notification.permission}. Notification not shown.`);
  }
};

/**
 * Requests permission from the user to show notifications.
 * @returns A promise that resolves to the permission state ('granted', 'denied', or 'default').
 */
export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
    if (!('Notification' in window)) {
        console.error('Notifications not supported.');
        return 'denied';
    }
    const permission = await Notification.requestPermission();
    return permission;
};
