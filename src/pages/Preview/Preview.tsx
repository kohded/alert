import { Alert, Button, Snackbar } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import chimeMp3 from '../../assets/audio/chime.mp3';
import { Page } from '../../components/Page/Page';

type Request = { id: number; payload: string };

export const Preview = (): JSX.Element => {
  const previewText = 'Preview';
  // Mock requests from server on page load.
  const [requests, setRequests] = useState([
    { id: Math.floor(Math.random() * 1000), payload: 'Hospital' },
    { id: Math.floor(Math.random() * 1000), payload: 'Hospital' },
    { id: Math.floor(Math.random() * 1000), payload: 'Hospital' },
  ]);
  const [newRequests, setNewRequests] = useState<Request[]>([]);
  const [newRequestsCount, setNewRequestsCount] = useState(0);

  /**
   * Needs to have an iterations before playing otherwise, DOMException: The play method is not allowed by the user agent or the platform in the current context, possibly because the user denied permission.
   * This shouldn't be an issue with the login screen. If the user directly goes to this page first, then you'll get the exception and audio won't play.
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play#exceptions
   */
  const playNotificationChime = () => {
    const audio = new Audio(chimeMp3);
    // eslint-disable-next-line no-console
    audio.play().catch((error) => console.error(error));
  };

  /**
   * Mock requests from web socket.
   */
  const handleMockRequest = useCallback(() => {
    playNotificationChime();
    const id = Math.floor(Math.random() * 1000);
    setNewRequests([...newRequests, { id, payload: `Hospital ${id}` }]);
    setNewRequestsCount(newRequestsCount + 1);
  }, [newRequests, newRequestsCount]);

  /**
   * Click handler for Alert/Snackbar component. Merge newRequests into requests array.
   */
  const handleAlertClick = () => {
    setRequests([...requests, ...newRequests]);
    setNewRequestsCount(0);
    setNewRequests([]);
  };

  /**
   * Simulate mock requests automatically by setInterval of 5s.
   */
  useEffect(() => {
    const interval = setInterval(() => {
      handleMockRequest();
    }, 5000);
    return () => clearInterval(interval);
  }, [handleMockRequest]);

  return (
    <Page description={previewText} keywords={previewText} title={previewText}>
      <Button onClick={handleMockRequest} variant="contained">
        Mock Request
      </Button>
      <hr />
      {newRequestsCount > 0 && (
        <Alert onClick={handleAlertClick} style={{ width: '400px' }}>
          Request {newRequestsCount}
        </Alert>
      )}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        message={`Request ${newRequestsCount}`}
        onClick={handleAlertClick}
        open={newRequestsCount > 0}
      />
      <hr />
      {requests.map((request: Request) => {
        return (
          <p key={request.id}>
            {request.id} - {request.payload}
          </p>
        );
      })}
    </Page>
  );
};
