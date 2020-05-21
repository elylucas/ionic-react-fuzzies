import React, { useState } from 'react';
import { IonList, IonItem, IonInput, IonButton, IonHeader, IonToolbar, IonTitle, IonIcon, IonContent } from '@ionic/react';
import { addKid } from '../service/data.service';

import { useCamera } from '@ionic/react-hooks/camera';
import { CameraResultType, CameraSource } from '@capacitor/core';
import { camera } from 'ionicons/icons';

interface AddKidFormProps {
  onClose: () => void;
}

export const AddKidForm: React.FC<AddKidFormProps> = ({ onClose }) => {


  const { photo, getPhoto } = useCamera();

  const [name, setName] = useState<string>();
  const [goal, setGoal] = useState<string>();
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Kid</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonInput placeholder="Name" value={name} onIonChange={(e: any) => setName(e.target.value)} />
          </IonItem>
          <IonItem>
            <IonInput placeholder="Goal" type="number" value={goal} onIonChange={(e: any) => setGoal(e.target.value)} />
          </IonItem>
        </IonList>
        <div className="ion-padding-top ion-text-center">
          <IonButton
            color="medium"
            style={{ '--border-radius': '100%', width: '152px', height: '152px' }}
            onClick={() => getPhoto({
              resultType: CameraResultType.DataUrl,
              source: CameraSource.Camera,
              quality: 100
            })}>
            {photo ? (
              <img alt="avatar" style={{ width: '152px', height: '152px' }} src={`${photo.dataUrl}`} />
            ) : (
              <IonIcon style={{ fontSize: '72px' }} icon={camera} />
            )}
          </IonButton>
        </div>
        <div className="ion-padding-top">
          <IonButton
            expand="block"
            onClick={() => {
              if (name && goal) {
                addKid(name, parseInt(goal, 10), photo?.dataUrl);
                onClose();
              }
            }}>
            Add
          </IonButton>
        </div>
        <div className="ion-padding-top">
          <IonButton color="secondary" expand="block" size="default" onClick={onClose}>
            Cancel
          </IonButton>
        </div>
      </IonContent>
    </>
  );
};
