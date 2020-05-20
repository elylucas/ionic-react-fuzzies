import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonModal, useIonViewWillEnter, IonList, IonItem, IonAvatar, IonLabel, IonChip } from '@ionic/react';
import React, { useState } from 'react';
import { add } from 'ionicons/icons';
import { AddKidForm } from '../components/AddKidForm';
import { Kid, getKids } from '../service/data.service';

const Home: React.FC = () => {
  const [kids, setKids] = useState<Kid[]>([]);
  const [showAddKidModal, setShowAddKidModal] = useState(false);

  useIonViewWillEnter(() => {
    const kids = getKids();
    setKids(kids);
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Kids</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowAddKidModal(true)}>
              <IonIcon icon={add} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Kids</IonTitle>
          </IonToolbar>
        </IonHeader>

        {kids.length ? (
          <IonList>
            {kids.map((kid, n) => (
              <IonItem key={n} routerLink={`/kid/${kid.name}`}>
                {kid.image && (
                  <IonAvatar slot="start">
                    <img src={kid.image} />
                  </IonAvatar>
                )}
                <IonLabel>
                  <h2>{kid.name}</h2>
                  <p>Goal: {kid.goal}</p>
                </IonLabel>
                <IonChip slot="end">{kid.count}</IonChip>
              </IonItem>
            ))}
          </IonList>
        ) : (
            <div>Add some kids</div>
          )}

        <IonModal
          isOpen={showAddKidModal}
          onDidDismiss={() => {
            setKids(getKids());
            setShowAddKidModal(false);
          }}>
          <AddKidForm onClose={() => setShowAddKidModal(false)} />
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Home;
