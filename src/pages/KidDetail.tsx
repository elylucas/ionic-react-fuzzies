import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonButtons, IonBackButton, useIonViewWillEnter, IonIcon } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { Kid, getKid, updateKid } from '../service/data.service';
import { remove, add } from 'ionicons/icons';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './KidDetail.css';
import { Fireworks } from '../components/Fireworks';

interface KidDetailProps extends RouteComponentProps<{ name: string; }> {
}

const KidDetail: React.FC<KidDetailProps> = ({ match }) => {
  const [kid, setKid] = useState<Kid>();
  const [percentage, setPercentage] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  useIonViewWillEnter(() => {
    load();
  });

  const load = () => {
    const kid = getKid(match.params.name);
    setKid(kid);
    setPercentage((kid!.count / kid!.goal) * 100);
  };

  const addPoint = (kid: Kid) => {
    kid.count = Math.min(kid.goal, kid.count + 1);
    updateKid(kid);
    load();
    if (kid.count === kid.goal) {
      setShowCelebration(true);
      setTimeout(() => {
        setShowCelebration(false);
      }, 5000);
    }
  };

  const removePoint = (kid: Kid) => {
    kid.count = Math.max(0, kid.count - 1);
    updateKid(kid);
    load();
  };

  return (
    <IonPage id="kid-detail-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Kid Detail</IonTitle>
          <IonButtons>
            <IonBackButton defaultHref="/" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {kid && (
          <div className="progress-container">
            <h1>{kid.name}</h1>
            <CircularProgressbar value={percentage} text={`${kid.count} / ${kid.goal}`} />
            <div>
              <IonButton onClick={() => removePoint(kid)}>
                <IonIcon icon={remove} />
              </IonButton>
              <IonButton onClick={() => addPoint(kid)}>
                <IonIcon icon={add} />
              </IonButton>
            </div>
          </div>
        )}        
      </IonContent>
      {showCelebration && <Fireworks />}
    </IonPage>
  );
};

export default KidDetail;